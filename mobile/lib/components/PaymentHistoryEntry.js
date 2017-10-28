import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Body, Thumbnail, Text, Left, Button, Icon } from 'native-base';
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

export const actionTypes = {
  health: 'health',
  education: 'education',
  sport: 'sport',
}

export default function PaymentHistoryEntry({ amount, date, event }) {
  return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            {event.type === actionTypes.health && <Icon name={'md-medkit'}/> }
            {event.type === actionTypes.education && <Icon name={'md-school'}/> }
            {event.type === actionTypes.sport && <Icon name={'md-football'}/> }
            <Body>
            <Text>{event.title}</Text>
            <Text note>{moment(date).format('HH:MM, D MMMM YYYY')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
          <Text>
            {event.description}
          </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
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
    type: PropTypes.string
  })
};