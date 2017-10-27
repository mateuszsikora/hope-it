import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Payment from './payment';

class Payments extends PureComponent {
  static propTypes = {
    payments: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }

  renderPaymentsList(){
    return this.props.payments.map(payment => (<Payment payment={payment} />))
  }

  render(){
    return this.renderPaymentsList()
  }
}


export default Payments;
