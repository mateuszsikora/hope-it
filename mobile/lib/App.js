import React, { Component } from 'react';
import {Text, View} from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'


import Notifications from './components/Notifications'
import Wall from './components/Wall'
import Main from './components/Main'
import MobxDemo from './components/MobxDemo'
import PaymentsHistory from './components/PaymentsHistory';

export default function App() {
  return (
      <NativeRouter>
        <View style={{flex:1,alignItems:'flex-start', alignSelf: 'stretch'}}>
          <Route exact path="/" component={Main}/>
          <Route exact path="/wall" component={Wall}/>
          <Route path="/notifications" component={Notifications}/>
          <Route path="/mobx" component={MobxDemo}/>
          <Route path="/payments_history" component={PaymentsHistory}/>
        </View>
      </NativeRouter>
  );
}
