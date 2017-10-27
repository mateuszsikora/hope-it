// @flow

import React, { Component } from 'react';
import { View } from 'react-native'; 
import { Text, Content } from 'native-base';
import routes from './../routes';
import { Link } from 'react-router-native';

export default function Wall () {
  return (
    <Content>
      <View>
        <Text>Hello from the wall</Text>
      </View>
    </Content>
  )
}
