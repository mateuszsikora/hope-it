import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import Payment from './payment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {List, Header, Statistic} from 'semantic-ui-react'

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

  renderStats(){
    return (
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>15 225zł</Statistic.Value>
          <Statistic.Label>Suma zbiórki</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>520</Statistic.Value>
          <Statistic.Label>Darowizny</Statistic.Label>
        </Statistic>
        <Statistic>
            <Statistic.Value>123</Statistic.Value>
            <Statistic.Label>Darczyńców</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>123</Statistic.Value>
          <Statistic.Label>Darowizny w tym miesiącu</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>80</Statistic.Value>
          <Statistic.Label>Darczyńców w tym miesiącu</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    )
  }

  render(){
    return (
      <div>
          {this.renderStats()}
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
