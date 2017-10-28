// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
} from 'react-native'

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import AndroidPay from './AndroidPay'
import Payu from './Payu'

@observer
export default class MobxDemo extends Component {

  store = new Store();

  handlePress = () => {
    this.store.increment()
  }

  handlePaySuccess = () => {
    ToastAndroid.show('Payment successful.')
  }

  render () {
    const { counter } = this.store

    return (
      <View style={styles.container}>
        <Text>Value: {counter}</Text>
        <Button
          onPress={this.handlePress}
          title='Click me'
          color='green'
        />
        <AndroidPay
          amount={500}
          title='Akcja Cos'
          onSuccess={this.handlePaySuccess}
        />
        <Payu
          amount={500}
          title='Akcja Cos'
          onSuccess={this.handlePaySuccess}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  }
})

class Store {
  @observable counter = 0

  @action
  increment() {
    this.counter += 1
  }
}
