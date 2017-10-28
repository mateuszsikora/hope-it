import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const Payment = ({donor, amount, date, num, message}) => {
  const header = num
    ? (
      <span>
        {num} dotacji od {donor? donor.email: 'anonima'} za {formatNumber(amount / 100)} <small>PLN</small>
      </span>
    )
    : (
      <span>
        {formatNumber(amount / 100)} <small>PLN</small> od {donor? donor.email: 'anonima'}`
      </span>
    )
  return (
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>{header}</List.Header>
        <List.Description>
          {date? moment(date).format('llll'):''}
          {date && message? '|' : ''}
          {message? message.title : ''}</List.Description>
      </List.Content>

      {
        (donor && donor.email)?
        (
          <List.Content floated='right'>
            <Button><Icon name='mail' />Wyślij wiadomość</Button>
          </List.Content>
        ): null
      }
    </List.Item>
  )
}
Payment.propTypes = {
    donor: PropTypes.shape({email: PropTypes.string.isRequired}),
    amount: PropTypes.number.isRequired,
    date: PropTypes.string,
    message: PropTypes.shape({title: PropTypes.string})
}

export default Payment

export function formatNumber(num) {
  console.log(num)
  num = num.toFixed(0)
  return num.split('').reverse().reduce((acc, elem) => {
    const first = acc[0]
    if (first.length === 3) {
      acc.unshift(elem)
    } else {
      acc[0] = `${elem}${acc[0]}`
    }
    return acc
  }, ['']).join(',')
}

