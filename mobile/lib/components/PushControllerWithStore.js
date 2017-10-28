import React from 'react';

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import PushController from './PushController';

@observer
export default class PushControllerToStore extends React.Component {
  store = tokenStore;

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

class TokenStore {
  @observable token = '';

  @action
  setToken(token) {
    this.token = token;
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

export const tokenStore = new TokenStore();
