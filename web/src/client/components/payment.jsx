import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Avatar, Image, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const images = ['daniel', 'tom', 'rachel','lindsay', 'matt', 'christian', 'jenny', 'veronika', 'stevie','elliot'].map(name => {
  return `https://react.semantic-ui.com/assets/images/avatar/small/${name}.jpg`
})


function image (email) {
  email = email.toString()
  const img = email.split('').map(x => x.charCodeAt(0)).reduce((a, b) => a ^ b, 0xffff);
  return images[img % images.length]
}

const Payment = ({donor, amount, date, num, message}) => {
  const email = donor? donor.email: 'anonima';
  const header = num
    ? (
      <span>
        {num} dotacji od {email} za {formatNumber(amount / 100)} <small>PLN</small>
      </span>
    )
    : (
      <span>
        {formatNumber(amount / 100)} <small>PLN</small> od {email}`
      </span>
    )
  return (
    <List.Item>
      <Image avatar src={image(email)} />
      <List.Content>
        <List.Header>{header}</List.Header>
        <List.Description>
          {date? moment(date).format('llll'):''}
          {date && message? '  wsparł(a) ' : ''}
          {message? message.title : ''}</List.Description>
      </List.Content>

      {
        (donor && donor.email)?
        (
          <List.Content floated='right'>
            <Button basic><Icon name='mail' /> Wiadomość</Button>
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

