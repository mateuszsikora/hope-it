import React from 'react';

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import PushController from './PushController';

import { registerDonor } from './../api/donors';

@observer
export default class PushControllerToStore extends React.Component {
  store = new AppStore();

  componentDidMount() {
    this.store.init();
  }

  onChangeToken = (token) => {
    this.store.setToken(token);
  };

  render() {
    return (
        <PushController onChangeToken={this.onChangeToken}/>
    )
  }
}


export class AppStore {
  @observable token = '';

  @action
  setToken(token) {
    this.token = token;
    registerDonor({ token, email: 'macio@macio.sex' }).then(this.registerTokenCompleted, this.registerTokenFailed);
    console.log('token-set', token);
  }

  @action
  init() {
    this.isTokenRegistered = false;
  }

  @action.bound
  registerTokenCompleted() {
    this.isTokenRegistered = true;
  }

  @action.bound
  registerTokenFailed() {
    this.isTokenRegistered = false;
  }
}
