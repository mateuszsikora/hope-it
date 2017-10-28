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
    modalVisible: false
  }

  handlePay = () => {
    this.setState({
      modalVisible: true
    })
  }

  handleClose = () => {
    this.setState({
      modalVisible: false
    })
  }

  handleMessage = (data) => {
    console.log(data)
    alert('Message')
  }

  render () {
    const { modalVisible } = this.state

    return (
      <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.handleClose}
          >
            <WebView
              source={{uri: `${serverUrl}/payu`}}
              style={{marginTop: 22, marginLeft: 6, marginRight: 6}}
              onMessage={this.handleMessage}
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


