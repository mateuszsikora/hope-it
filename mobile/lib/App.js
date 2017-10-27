// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'

import Notifications from './components/Notifications'
import Wall from './components/Wall'

export default function App () {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link
            to="/"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text>Wall</Text>
          </Link>
          <Link
            to="/notifications"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text>Notifications</Text>
          </Link>
        </View>

        <Route exact path="/" component={Wall}/>
        <Route path="/notifications" component={Notifications}/>
      </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  }
})
