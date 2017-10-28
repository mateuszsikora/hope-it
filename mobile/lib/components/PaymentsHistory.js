import React, { Component } from 'react';

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import PaymentHistoryEntry from './PaymentHistoryEntry';
import {
  Container,
  Title,
  Right,
  Button,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Body,
  Icon,
  Text,
  Left,
  Footer,
  FooterTab
} from 'native-base';
import { getCurrentUsersPayment } from './../api/payments';

import { actionTypes } from './PaymentHistoryEntry';

const possibleTypes = Object.values(actionTypes);

@observer
export default class PaymentsHistory extends Component {

  store = new PaymentsHistoryStore();

  componentDidMount(){
    this.store.initHistoryStore();
  }

  render() {
    const { payments, isLoading } = this.store;

    return (
        <Content>
          {isLoading && <Text>Loading...</Text>}
          {!isLoading && payments.map((payment, key) => (
              <PaymentHistoryEntry
                  key={key} {...payment}
                  event={{ ...payment.event, type: getRandomType() }}
              />
          ))}
        </Content>
    )
  }
}

class PaymentsHistoryStore {
  @observable isLoading = false;
  @observable payments = [];

  @action
  initHistoryStore() {
    this.isLoading = true;
    getCurrentUsersPayment().then(this.initHistoryStoreSuccess,this.initHistoryStoresError);
  }

  @action.bound // callback action
  initHistoryStoreSuccess(payments) {
    this.payments = payments;
    this.isLoading = false;
  }

  @action.bound // callback action
  initHistoryStoresError(error) {
    this.isLoading = false;
    console.log(error);
  }
}

function getRandomType() {
  const index = parseInt(Math.random() * possibleTypes.length);
  return possibleTypes[index]
}


