import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import Payment from './payment';

class Payments extends PureComponent {
  static propTypes = {
    payments: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }

  renderPaymentsList(){
    return (
      <Segment>
     {this.props.payments.map((payment, idx) => (<Payment {...payment} key={idx} />))}
   </Segment>
   )
  }

  render(){
    return (
      <ul>
        {this.renderPaymentsList()}
      </ul>
    )
  }
}


export default Payments;
