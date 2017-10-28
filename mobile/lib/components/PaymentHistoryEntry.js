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

export default function PaymentHistoryEntry({ amount, date, event }) {
  return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Body>
            <Text>{event.title}</Text>
            <Text note>{moment(date).format('HH:MM, D MMMM YYYY')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body style={{ flex: 1 }}>
          {Boolean(event.image) &&
          (
              <View style={{ height: 180, alignSelf: 'stretch' }}>
                <Image
                  source={{ uri: 'data:image/jpg;base64,' + event.image }}
                  style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }}
                />
              </View>
          )}
          <Text>
            {event.description}
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
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string
  })
};