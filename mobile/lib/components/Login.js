import React from 'react';

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {
  Content,
  Button
} from 'native-base';

import { Image, View } from 'react-native';


import { tokenStore } from './PushControllerWithStore';

import { registerDonor } from './../api/donors';

@observer
export default class Login extends React.Component {

  store = loginStore;

  init = () => {
    this.store.init();
  };

  render() {
    return (
        <Content style={{backgroundColor: 'white'}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent:'center', height: 650,}}>
            <Image style={{ height: 200, width: 200, marginBottom: 50}} source={require('./img/hopeIT_hackaton_fb_avatar_256x256_01.png')} />
            <GoogleSigninButton
                style={{ alignSelf: 'stretch', height: 84, marginLeft: 40, marginRight: 40}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.init}/>
            <Button onPress={this.init}/>
          </View>
          {this.store.isGoogleSiginConfigured === true && <Text>Success</Text>}
        </Content>
    );
  }
}


const userEmail = 'macio@gmail.com';

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
        .catch(() => null) //catchjes failutres in signIn
        .then(() => {
          registerDonor({ deviceId: tokenStore.token, email: userEmail })
        })
        .then(this.initSuccess, this.initFailure);
  }

  @action.bound
  initSuccess(user) {
    this.user = {
      email: userEmail
    };
    this.isGoogleSiginConfigured = true;
  }

  @action.bound
  initFailure() {
    this.user = {};
    this.isGoogleSiginConfigured = false;
  }
}

export const loginStore = new LoginStore();