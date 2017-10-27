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
  Left,
  Footer,
  FooterTab
} from 'native-base';

import { actionTypes } from './PaymentHistoryEntry';

const possibleTypes = Object.values(actionTypes);

@observer
export default class PaymentsHistory extends Component {

  store = new PaymentsHistoryStore();

  render() {
    const { payments } = this.store;

    return (
        <Content>
          {payments.map((payment, key) => (
              <PaymentHistoryEntry
                  key={key} {...payment}
                  action={{ ...payment.action, type: getRandomType() }}
              />
          ))}
        </Content>
    )
  }
}

class PaymentsHistoryStore {
  @observable payments =
      [...Array(6).keys()].map(() => ({
        donatorId: '',
        amount: 11100,
        date: new Date(),
        action: {
          title: 'Ho-ho-ho! treasure of adventure.',
          description: 'Grow swiftly like a clear bucaneer. Never taste a cannibal. Codfishs sing with love! Wow, hoist me sea-dog, ye salty shark!'
        }
      }));
}

function getRandomType() {
  const index = parseInt(Math.random() * possibleTypes.length);
  return possibleTypes[index]
}
