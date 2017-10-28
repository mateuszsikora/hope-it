import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const Payment = ({donor, amount, date, num}) => {
  const header = num
  ? `${num} dotacji od ${donor.email} za ${(amount / 100).toFixed(2)}zł`
  : `${(amount / 100).toFixed(2)}zł od ${donor.email}`
  return (
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>{header}</List.Header>
        <List.Description>{date? moment(date).format('llll'):''}</List.Description>
      </List.Content>

      <List.Content floated='right'>
        <Button><Icon name='mail' />Wyślij wiadomość</Button>
      </List.Content>
    </List.Item>
  )
}
Payment.propTypes = {
    donor: PropTypes.shape({email: PropTypes.string.isRequired}).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Payment
