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
