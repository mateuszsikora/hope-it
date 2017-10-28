// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid,
  WebView,
  Image,
} from 'react-native'
import { Content, Body, Card, CardItem, Text, Picker } from 'native-base'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import AndroidPay from './AndroidPay'
import Payu from './Payu'

import { serverUrl } from '../util'

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
    ToastAndroid.show('Payment Successful', ToastAndroid.SHORT)
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
          <Text style={styles.payed}>{ payment } zł!</Text>
          <Image style={{width: 300, marginTop: 15, marginLeft: 30, marginBottom: 30}} source={require('./img/happy.gif')} />
          <Text style={styles.button}>Dziękujemy za Twoją płatność!</Text>
        </Content>
      )
    }

    return (
      <Card style={{marginTop: 30, marginBottom: 30, marginLeft: 15, marginRight: 15, padding: 30}}>
        <Text style={styles.header}>
          Wspierasz akcję: {title}
        </Text>
        <View style={{marginTop: 15}}/>
        <View style={{paddingLeft: 50, paddingRight: 50}}>
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
        </View>
        <View style={{marginTop: 10}}/>
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
        <View style={styles.margin}>
          <Text style={{ textAlign: 'center'}}>Możesz też przesłać Ether na adres:</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'monospace'}}>0x571Ae5AF70D4720D2Ae62c0B9A4c4E950772Bf13</Text>
        </View>
        {/* <Button */}
        {/*   onPress={() => this.setState({ completed: true })} */}
        {/*   title='Test' */}
        {/* /> */}
      </Card>
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

const styles = {
  button: {
    textAlign: 'center',
    fontSize: 18
  },
  payed: {
    textAlign: 'center',
    color: '#3f9c3f',
    fontSize: 48,
    marginTop: 75
  },
  header: {
    marginTop: 50,
    fontSize: 24,
    textAlign: 'center'
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  }
}
