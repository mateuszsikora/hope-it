import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';

const Payment = ({donor, amount, date}) => (
  <List.Item>
    <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
    <List.Content>
      <List.Header>{amount}zł od {donor.email}</List.Header>
      <List.Description> {date}  </List.Description>
    </List.Content>

    <List.Content floated='right'>
      <Button><Icon name='mail' />Wyślij wiadomość</Button>
    </List.Content>
  </List.Item>
)

Payment.propTypes = {
    donor: PropTypes.shape({email: PropTypes.string.isRequired}).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Payment
