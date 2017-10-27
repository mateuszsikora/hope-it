// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class MobxDemo extends Component {

  store = new Store();

  handlePress = () => {
    this.store.increment()
  }

  handlePay = () => {
    const METHOD_DATA = [{
      supportedMethods: ['android-pay'],
      data: {
        supportedNetworks: ['visa', 'mastercard'],
        countryCode: 'PL',
        currencyCode: 'PLN',
        environment: 'TEST',
        paymentMethodTokenizationParameters: {
          tokenizationType: 'GATEWAY_TOKEN',
          parameters: {
            gateway: 'braintree',
            'braintree:tokenizationKey': 'sandbox_nrxj97b3_6hdtxfwxh4g8782q'
          }
        }
      }
    }];   
    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Movie Ticket',
          amount: { currency: 'PLN', value: '1.00' }
        }
      ],
      total: {
        label: 'Merchant Name',
        amount: { currency: 'PLN', value: '1.00' }
      },
    };
    const OPTIONS = {
      requestPayerEmail: true
    }

    console.log('starting payment')
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS)
    paymentRequest.show().then(response => {
      console.log('started')
      console.log(response)
      const { getPaymentToken } = response.details
      return getPaymentToken()
        .then(paymentToken => {
          console.log(paymentToken)
        })
    }).catch(err => {
      console.error(err)
      throw err
    })
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

        <Button
          onPress={this.handlePay}
          title='Pay'
          color='red'
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
