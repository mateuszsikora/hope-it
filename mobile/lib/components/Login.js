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

  store = new LoginStore();

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
        </Content>
    );
  }
}


export class LoginStore {
  @observable isGoogleSiginConfigured = false;
  @observable user = {};

  @action
  init() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      return GoogleSignin.configure({
        webClientId: 'AIzaSyCMiNNSeio53G9thTavyqnDq11ax-wquPo', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVERn
        accountName: 'HopeIt' // [Android] specifies an account name on the device that should be used
      })
    })
        .then(() => GoogleSignin.currentUserAsync())
        .then(this.initSuccess, this.initFailure)
  }

  @action.bound
  initSuccess(user) {
    this.user = user;
    this.isGoogleSiginConfigured = true;
  }

  @action.bound
  initFailure() {
    this.isGoogleSiginConfigured = false;
  }
}