import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const Payment = ({donor, amount, date, num, message}) => {
  const header = num
  ? `${num} dotacji od ${donor? donor.email: 'anonima'} za ${(amount / 100).toFixed(2)}zł`
  : `${(amount / 100).toFixed(2)}zł od ${donor? donor.email: 'anonima'}`
  return (
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>{header}</List.Header>
        <List.Description>{date? moment(date).format('llll'):''} | {message? message.title}</List.Description>
      </List.Content>

      <List.Content floated='right'>
        <Button><Icon name='mail' />Wyślij wiadomość</Button>
      </List.Content>
    </List.Item>
  )
}
Payment.propTypes = {
    donor: PropTypes.shape({email: PropTypes.string.isRequired}),
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    message: PropType.shape({title: PropType.string})
}

export default Payment
