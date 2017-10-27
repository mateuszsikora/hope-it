import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Payment = ({userid, amount, date}) => (
  <li>
    {userid}: {amount}: {date}
  </li>
)

Payment.propTypes = {
    userid: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Payment
