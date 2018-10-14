import * as React from 'react';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { DeviceEventEmitter, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, Provider } from 'react-redux';
import * as _ from 'lodash';

import { STORE } from './src/Config/store';

const ConnectedRouter = connect()(Router);

import SplashScreen from 'react-native-splash-screen';
import HomeComponent from './src/Main/homeScreen';
import DetailComponent from './src/Main/detailScreen';
import FormComponent from './src/Main/formScreen';

export default class App extends React.Component<any> {
  backPressSubscriptions: any;

  constructor(props: any) {
    super(props);
    this.backPressSubscriptions = new Set();
  }

  componentDidMount = () => {
    SplashScreen.hide();

    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true;
      const subscriptions: any = [];

      this.backPressSubscriptions.forEach((sub: any) => subscriptions.push(sub));

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp();
      }
    });

    this.backPressSubscriptions.add(this.handleHardwareBack);
  }

  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  handleHardwareBack = () => {
    const { state } = Actions;
    if (_.get(state, 'index') > 0) {
      Actions.pop();
    } else {
      if (_.get(state, 'routes[0].index') > 0) {
        Actions.dashboard();
      } else {
        Alert.alert('Are you sure you want to close this app ?', '', [
          { text: 'No', onPress: () => { } },
          { text: 'Yes', onPress: () => { BackHandler.exitApp(); } },
        ]);
      }
    }

    return true;
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={STORE}>
        <ConnectedRouter>
          <Stack key='root'>
            <Scene key='home' component={HomeComponent} initial hideNavBar />
            <Scene key='detail' component={DetailComponent}
              renderBackButton={() => <Icon name={'md-arrow-back'} color={'#fff'} size={24} style={{ paddingHorizontal: 20 }} onPress={Actions.pop} />}
              titleStyle={{ color: '#fff' }}
              navigationBarStyle={{ backgroundColor: '#0f4270', color: '#fff' }}
            />
            <Scene key='addContact' component={FormComponent}
              renderBackButton={() => <Icon name={'md-arrow-back'} color={'#fff'} size={24} style={{ paddingHorizontal: 20 }} onPress={Actions.pop} />}
              titleStyle={{ color: '#fff' }}
              navigationBarStyle={{ backgroundColor: '#0f4270', color: '#fff' }}
            />
          </Stack>

        </ConnectedRouter>
      </Provider>
    );
  }
}
