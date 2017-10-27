// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'

import Notifications from './components/Notifications'

export default function App () {
  return (
    <View style={styles.container}>
      <Notifications />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
