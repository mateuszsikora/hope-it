import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const Payment = ({donor, amount, date, num, message}) => {
  const header = num
  ? `${num} dotacji od ${donor? donor.email: 'anonima'} za ${(amount / 100).toFixed(0)}PLN`
  : `${(amount / 100).toFixed(0)}PLN od ${donor? donor.email: 'anonima'}`
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
