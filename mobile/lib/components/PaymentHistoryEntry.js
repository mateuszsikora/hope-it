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

export default function PaymentHistoryEntry({ amount, date, action }) {
  return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            {action.type === actionTypes.health && <Icon name={'md-medkit'}/> }
            {action.type === actionTypes.education && <Icon name={'md-school'}/> }
            {action.type === actionTypes.sport && <Icon name={'md-football'}/> }
            <Body>
            <Text>{action.title}</Text>
            <Text note>{moment(date).format('HH:MM, D MMMM YYYY')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
          <Text>
            {action.description}
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
  date: PropTypes.instanceOf(Date).props,
  action: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string
  })
};