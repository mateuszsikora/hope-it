import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'

import { Link, AndroidBackButton } from 'react-router-native'
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
  Text,
  Body,
  Icon,
  Left
} from 'native-base';
import commonStyles from './commonStyles';

@observer
export default class PaymentsHistory extends Component {

  store = new PaymentsHistoryStore();

  render() {
    const { payments } = this.store;

    return (
        <Container style={commonStyles.container}>
          <Header>
            <AndroidBackButton/>
            <Button transparent>
              <Icon name='menu'/>
            </Button>
            <Body>
            <Title>Historia Płatności</Title>
            </Body>
          </Header>
          <Content>
            {payments.map((payment, key) => (
                <PaymentHistoryEntry key={key} {...payment}/>
            ))}
          </Content>
        </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  }
});

class PaymentsHistoryStore {
  @observable payments =
      [...Array(6).keys()].map(() => ({
        donatorId: '',
        amount: 11100,
        date: Date.now(),
        action: null
      }))
}
