import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Body, Thumbnail, Text, Left, Button, Icon } from 'native-base';
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

export const actionTypes = {
  health: 'health',
  education: 'education',
  sport: 'sport',
};

export default function PaymentHistoryEntry({ amount, date, message }) {
  return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Body>
            <Text>{message.title}</Text>
            <Text note>{moment(date).format('llll')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body style={{ flex: 1 }}>
          {Boolean(message.image) &&
          (
              <View style={{ height: 180, alignSelf: 'stretch' }}>
                <Image
                  source={{ uri: 'data:image/jpg;base64,' + message.image }}
                  style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }}
                />
              </View>
          )}
          <Text>
            {message.content}
          </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Text style={{ paddingLeft: 0, paddingRight: 5, color: '#87838B' }}>Wpłaciłeś: </Text>
              <Text style={{ paddingLeft: 0 }}>{parseInt(amount / 100)} zł</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
  )
}

PaymentHistoryEntry.propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string
  })
};
