import React, { Component } from 'react';
import {
  StyleSheet, View, Text, FlatList,
  Image, TouchableOpacity, Alert, Modal, ActivityIndicator
} from 'react-native';
import * as _ from 'lodash';
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/Ionicons';
import { Loading } from './Components/Loading';

import homeRestService from './homeRest';
import { Actions } from 'react-native-router-flux';

export default class HomeComponent extends Component<any> {
  api = new homeRestService;

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true }, () => {
      this.api.getList().subscribe((resp: any) => {
        this.setState({
          data: resp.data.sort((a, b) => {
            var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
            var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }),
          loading: false
        });
      }, (err: any) => {
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const { state } = this;
    return (
      <View style={styles.container}>
        <FlatList
          extraData={state}
          data={_.get(state, 'data')}
          renderItem={({ item, index }) => {
            return (
              <View style={index !== 0 ? { borderTopWidth: 1, borderTopColor: '#9b9b9b' } : {}}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}
                  onPress={() => {
                    Actions.detail({
                      title: `${_.get(item, 'firstName')} ${_.get(item, 'lastName')}`,
                      id: _.get(item, 'id')
                    });
                  }}
                  onLongPress={() => {
                    Alert.alert(
                      `${_.get(item, 'firstName')} ${_.get(item, 'lastName')}`,
                      'Select operation for this contact',
                      [
                        {
                          text: 'Preview', onPress: () => {
                            Actions.detail({
                              title: `${_.get(item, 'firstName')} ${_.get(item, 'lastName')}`,
                              id: _.get(item, 'id')
                            })
                          }
                        }, {
                          text: 'Do Nothing', onPress: () => { }
                        }, {
                          text: 'Delete', onPress: () => {
                            this.api.deleteContact(_.get(item, 'id')).subscribe((resp: any) => {
                              this.loadData();
                            }, (err: any) => {
                              this.loadData();
                            })
                          }
                        }
                      ],
                      { cancelable: false }
                    )
                  }}
                >
                  <View style={{ width: '25%' }}>
                    {_.get(item, 'photo') !== 'N/A' ?
                      <Image source={{ uri: _.get(item, 'photo') }} resizeMode='cover' style={{ width: 60, height: 60, borderRadius: 30 }} /> :
                      <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#9b9b9b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>{_.get(item, 'firstName').toUpperCase().substr(0, 1)}</Text>
                      </View>
                    }
                  </View>
                  <View style={{ width: '75%' }}>
                    <Text style={{ fontSize: 16, color: '#4a4a4a' }}>{`${_.get(item, 'firstName')} ${_.get(item, 'lastName')}`}</Text>
                    <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#9b9b9b' }}>{`Age: ${_.get(item, 'age')}`}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />

        <FAB
          buttonColor='#0f4270'
          iconTextColor='#FFFFFF'
          onClickAction={() => {
            Actions.addContact({
              onSubmit: (value: any) => {
                this.api.addContact(value).subscribe(() => {
                  Actions.reset('home');
                }, (err) => { })
              },
              title: 'Create Contact'
            });
          }}
          visible={true}
          iconTextComponent={<Icon name='md-add' />}
        />
        <Loading loading={_.get(state, 'loading')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
