import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import * as _ from 'lodash';
import TextInput from './Components/TextInput';

class FormComponent extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9b9b9b' }}>
          <View style={{ width: '30%', justifyContent: 'center' }}>
            <Text>{'First Name'}</Text>
          </View>
          <View style={{ width: '70%' }}>
            <Field name={'firstName'} component={TextInput} placeholder={'First Name'} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9b9b9b' }}>
          <View style={{ width: '30%', justifyContent: 'center' }}>
            <Text>{'Last Name'}</Text>
          </View>
          <View style={{ width: '70%' }}>
            <Field name={'lastName'} component={TextInput} placeholder={'Last Name'} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9b9b9b' }}>
          <View style={{ width: '30%', justifyContent: 'center' }}>
            <Text>{'Age'}</Text>
          </View>
          <View style={{ width: '70%' }}>
            <Field name={'age'} component={TextInput} placeholder={'Age'} keyboardType={'numeric'} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9b9b9b' }}>
          <View style={{ width: '30%', justifyContent: 'center' }}>
            <Text>{'Image URL'}</Text>
          </View>
          <View style={{ width: '70%' }}>
            <Field name={'photo'} component={TextInput} placeholder={'Image URL'} />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(this.props.onSubmit)}
          style={{ marginTop: 40, height: 42, backgroundColor: '#0f4270', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            {'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#F5FCFF',
  },
});

export default reduxForm({ form: 'contactForm' })(FormComponent)
