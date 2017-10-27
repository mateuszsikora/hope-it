import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Payment = ({userid, amount, date}) => (
  <div>
    {userid}: {amount}: {date}
  </div>
)

Payment.propTypes = {
    userid: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Payment
