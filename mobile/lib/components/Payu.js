// @flow

import React, { Component } from 'react';
import {
  View,
  Modal,
  WebView,
} from 'react-native'
import {Button, Icon, Text} from 'native-base' 
import { serverUrl } from '../util'

export default class Payu extends Component {
  state = {
    modalVisible: false,
    opacity: 0
  }

  handlePay = () => {
    this.setState({
      modalVisible: true
    })
    setTimeout(() => {
      this.setState({
        opacity: 1.0
      })
    }, 2000)
  }

  handleClose = () => {
    this.setState({
      modalVisible: false,
      opacity: 0
    })
  }

  onStateChange = (data) => {
    if (data.url.endsWith('/thankyou')) {
      this.setState({
        modalVisible: false
      })
    }
  }

  render () {
    const { modalVisible, opacity } = this.state

    return (
      <View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={this.handleClose}
          >
            <WebView
              ref={webview => this.webview = webview}
              source={{uri: `${serverUrl}/payu`}}
              style={{position: 'absolute', left: 12, right: 12, bottom: 50, top: 50, opacity }}
              startingInLoadingState
              onNavigationStateChange={this.onStateChange}
            />
          </Modal>
          <Button
            info
            iconRight
            onPress={this.handlePay}
          >
            <Text>PayU</Text>
            <Icon name='ios-card' />
          </Button>
      </View>
    )
  }
}


