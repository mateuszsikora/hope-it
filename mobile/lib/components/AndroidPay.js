// @flow

import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import {Button, Icon, Text} from 'native-base' 

export default class AndroidPay extends Component {
  handlePay = () => {
    const { amount, title, onSuccess } = this.props
    console.log(amount)

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
    const value = (amount / 100).toFixed(2)
    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: title,
          amount: { currency: 'PLN', value }
        }
      ],
      total: {
        label: 'Fundacja Na Ratunek',
        amount: { currency: 'PLN', value }
      },
    };

    console.log('starting payment')
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS)
    paymentRequest.show().then(response => {
      console.log('started')
      console.log(response)
      const { getPaymentToken } = response.details
      return getPaymentToken()
        .then(paymentToken => {
          console.log('success', paymentToken)
          onSuccess()
        })
    }).catch(err => {
      onSuccess()
      console.log('error', err)
    })
  }

  render () {
    return (
      <View style={margin}>
          <Button
            iconRight
            onPress={this.handlePay}
            success
            block
          >
            <Text>Android Pay</Text>
            <Icon name='logo-android' />
          </Button>
      </View>
    )
  }
}

AndroidPay.defaultProps = {
  amount: 0,
  title: 'Dotacja',
  onSuccess: () => {}
}

const margin = {
  marginTop: 15,
  marginBottom: 15
}
