import React from 'react';
import {
  View, Text, Modal, ActivityIndicator
} from 'react-native';

export const Loading = (props: any) =>
  <Modal
    animationType="fade"
    transparent
    visible={props.loading}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 4 }}>
        <ActivityIndicator size="large" color="#0f4270" />
        <Text style={{ paddingLeft: 20 }}>{'Loading ...'}</Text>
      </View>
    </View>
  </Modal>