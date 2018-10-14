import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
  Image,
  Alert
} from 'react-native';
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { Loading } from './Components/Loading';

import homeRestService from './homeRest';

export default class DetailComponent extends Component<any> {
  api = new homeRestService;

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      data: {}
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true }, () => {
      this.api.load(this.props.id).subscribe((resp: any) => {
        this.setState({
          data: resp.data,
          loading: false
        });
      }, (err: any) => {
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const { data, loading } = this.state;
    return (
      <View style={styles.container}>
        {_.get(data, 'photo') !== 'N/A' ?
          <Image source={{ uri: _.get(data, 'photo') }} resizeMode='cover' style={{ width: 250, height: 250, borderRadius: 125 }} /> :
          <View style={{ width: 250, height: 250, borderRadius: 125, backgroundColor: '#9b9b9b', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 50, color: '#fff' }}>{_.get(data, 'firstName').toUpperCase().substr(0, 1)}</Text>
          </View>
        }
        <Text style={{ fontSize: 16, color: '#4a4a4a', paddingTop: 40 }}>{`${_.get(data, 'firstName')} ${_.get(data, 'lastName')}`}</Text>
        <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#9b9b9b' }}>{`Age: ${_.get(data, 'age')}`}</Text>

        <FAB
          buttonColor='#0f4270'
          iconTextColor='#FFFFFF'
          onClickAction={() => {
            Actions.addContact({
              initialValues: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age.toString(),
                photo: data.photo
              },
              onSubmit: (value: any) => {
                this.api.editContact(this.props.id, value).subscribe(() => {
                  Actions.reset('home');
                }, (err) => {
                  Alert.alert('Error', err.response.data.message)
                })
              },
              title: 'Update Contact'
            });
          }}
          visible={true}
          iconTextComponent={<Icon name='md-create' />}
        />
        <Loading loading={loading} />
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
