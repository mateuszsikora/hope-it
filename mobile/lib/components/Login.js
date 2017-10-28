import React from 'react';

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {
  Content,
  Button
} from 'native-base';

@observer
export default class Login extends React.Component {

  store = loginStore;

  init = () => {
    this.store.init();
  };

  render() {
    return (
        <Content>
          <GoogleSigninButton
              style={{ alignSelf: 'stretch', height: 84 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.init}/>
          <Button onPress={this.init}/>
          {this.store.isGoogleSiginConfigured === true && <Text>Success</Text>}
        </Content>
    );
  }
}

class LoginStore {
  @observable isGoogleSiginConfigured = false;
  @observable user = {
    email: undefined
  };

  @action
  init() {
    this.user = {
      email: undefined
    };
    this.isGoogleSiginConfigured = false;
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      return GoogleSignin.configure({
        // webClientId: 'AIzaSyCMiNNSeio53G9thTavyqnDq11ax-wquPo', // client ID of type WEB for your server (needed to verify user ID and offline access)
        webClientId: 'AIzaSyCb4OgRxbNCGzyI4l8VR_iBA2jLm5jxDUQ', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVERn
        //accountName: 'com.' // [Android] specifies an account name on the device that should be used
      })
    })
        .then(() => GoogleSignin.signIn())
        .then(this.initSuccess, this.initFailure)
  }

  @action.bound
  initSuccess(user) {
    this.user = user;
    this.isGoogleSiginConfigured = true;
  }

  @action.bound
  initFailure() {
    this.user = {
      email: 'macio@gmail.com'
    };
    this.isGoogleSiginConfigured = true;
  }
}

export const loginStore = new LoginStore();