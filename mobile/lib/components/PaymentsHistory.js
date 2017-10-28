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
  FooterTab,
  View,
} from 'native-base';
import { Image } from 'react-native'
import { getCurrentUsersPayment } from '../api/payments';
import MainLoader from './MainLoader';

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
        <Container>
          <Header />
          <Content>
          {isLoading && <MainLoader/>}
          {!isLoading && !payments.length && (
            <View>
              <Text style={{marginTop: 75, marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: 24}}>
                Nie wykonałeś jeszcze żadnych dotacji :(
              </Text>
              <Image source={require('./img/sad.gif')} style={{width: 250, height: 250, marginLeft: 50, marginTop: 50}}/>
            </View>
          )}
          {!isLoading && payments.map((payment, key) => (
              <PaymentHistoryEntry
                  key={key} {...payment}
                  message={{ ...payment.message, type: getRandomType() }}
              />
          ))}
        </Content>
      </Container>
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
