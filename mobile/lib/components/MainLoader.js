import React from 'react';
import { View, Text } from 'react-native';
import { Spinner } from 'native-base';

export default function MainLoader() {
  return (
      <View style={{ marginTop: 264, alignSelf: 'stretch', flex: 1, alignItems: 'center' }}>
        <Spinner color={'blue'}/>
        <Text>Ładuję...</Text>
      </View>
  );
}
