// @flow

import React, { Component } from 'react';
import {
  View,
  Modal,
  WebView,
} from 'react-native'
import {Button, Icon, Text, Content} from 'native-base'
import { serverUrl } from '../util'
import axios from 'axios'

export default class Payu extends Component {
  state = {
    modalVisible: false,
    uri: '',
  }

  handlePay = async () => {
    const { title, email, deviceId, message, amount } = this.props
    const res = await axios.post(`${serverUrl}/api/payments/payu`, {
      title, email, amount, deviceId, message
    })

    this.setState({
      uri: res.data.redirectUri,
      modalVisible: true
    })
  }

  handleClose = () => {
    this.setState({
      modalVisible: false,
    })
  }

  onStateChange = (data) => {
    if (data.url.endsWith('/thankyou')) {
      this.setState({
        modalVisible: false
      })
      this.props.onSuccess()
    }
  }

  render () {
    const { modalVisible, uri } = this.state

    return (
      <Content style={margin}>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={this.handleClose}
          >
            <WebView
              ref={webview => this.webview = webview}
              source={{ uri }}
              style={{position: 'absolute', left: 12, right: 12, bottom: 50, top: 50 }}
              startingInLoadingState
              onNavigationStateChange={this.onStateChange}
            />
          </Modal>
          <Button
            primary
            block
            iconRight
            onPress={this.handlePay}
          >
            <Text>PayU</Text>
            <Icon name='ios-card' />
          </Button>
      </Content>
    )
  }
}

Payu.defaultProps = {
  title: '<akcja>',
  email: 't@g.com',
  deviceId: '1',
  message: null,
  amount: 0,
  onSuccess: () => {}
}

const margin = {
  marginTop: 15,
  marginBottom: 15
}

