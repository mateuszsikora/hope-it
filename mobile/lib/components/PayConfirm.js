// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid,
  Picker,
} from 'react-native'
import { Content, Text } from 'native-base'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import AndroidPay from './AndroidPay'
import Payu from './Payu'

@observer
export default class PayConfirmMain extends Component {
  render () {
    return (
      <PayConfirm
        title={store.title}
        message={store.message}
        email={store.email}
        deviceId={store.deviceId}
        onSuccess={this.props.onSuccess}
      />
    )
  }
}

class PayConfirm extends Component {

  state = {
    payment: '10',
    completed: false
  }

  handlePaySuccess = () => {
    ToastAndroid.show('Payment successful.')
    this.setState({
      completed: true
    })
  }

  render () {
    const { payment, completed } = this.state
    const { title, email, message } = this.props
    const a = parseInt(payment, 10)
    const amount = a * 100

    if (completed) {
      return (
        <Content>
          <Text>Dziękujemy za wsparcie {title}</Text>
        </Content>
      )
    }

    return (
      <Content>
        <Text>Dziękujemy za wsparcie {title}</Text>
        <View style={{marginTop: 15}}/>
        <Picker
          selectedValue={payment}
          onValueChange={payment => this.setState({payment})}>
          <Picker.Item label='1 zł' value='1' />
          <Picker.Item label='2 zł' value='2' />
          <Picker.Item label='5 zł' value='5' />
          <Picker.Item label='10 zł' value='10' />
          <Picker.Item label='20 zł' value='20' />
          <Picker.Item label='30 zł' value='30' />
          <Picker.Item label='40 zł' value='40' />
          <Picker.Item label='50 zł' value='50' />
          <Picker.Item label='75 zł' value='75' />
          <Picker.Item label='100 zł' value='100' />
        </Picker>
        <View style={{marginTop: 30}}/>
        <AndroidPay
          amount={a}
          title={title}
          onSuccess={this.handlePaySuccess}
        />
        <Payu
          amount={a}
          title={title}
          email={email}
          message={message}
          onSuccess={this.handlePaySuccess}
        />
      </Content>
    )
  }
}

PayConfirm.defaultProps = {
  title: '<akcja>',
  email: 't@g.com',
  deviceId: '1'
}

class Store {
  @observable title = '<akcja>'
  @observable email = 't@g.com'
  @observable deviceId = '1'
  @observable message = null

  @action
  setPayment({title, email, deviceId, message}) {
    this.title = title
    this.email = email
    this.deviceId = deviceId
    this.message = message
  }
}
export const store = new Store();
