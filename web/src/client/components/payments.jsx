import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import Payment from './payment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {List, Header} from 'semantic-ui-react'

class Payments extends PureComponent {
  static propTypes = {
    payments: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }

  componentDidMount(){
    this.props.actions.payments();
  }

  renderPaymentsList(){
    return (
      <Segment>
        <Header> Lista ostatnich wpłat</Header>
        <List divided>
          {this.props.payments.map((payment, idx) => (<Payment {...payment} key={idx} />))}
        </List>
      </Segment>
   )
  }

  render(){
    return (
      <div>
          {this.renderPaymentsList()}
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  payments: state.payments.payments
});
const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators( actions,dispatch)});
export default connect(mapStateToProps,mapDispatchToProps)( Payments);
