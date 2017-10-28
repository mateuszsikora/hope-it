import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import Payment from './payment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {List, Header, Statistic, Tab} from 'semantic-ui-react'
import moment from 'moment';

class Payments extends Component {
  static propTypes = {
    payments: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }

  componentDidMount(){
    this.props.actions.payments();
    setInterval(()=>this.props.actions.payments(), 4000);
  }

  getTotalAmount(){
    return this.props.payments.map(p=>p.amount).reduce((a,b)=>a+b, 0)
  }

  getDonors(){
    return this.props.payments.map(p=>p.donor? p.donor.deviceId: 'Anonim').filter((a, idx, arr)=>arr.indexOf(a) === idx ).length
  }

  getDotations(){
    return this.props.payments.length
  }

  getTotalLastAmount(){
    const m = moment().subtract(1, 'month');
    return this.props.payments.filter(p=>moment(p.date) > m).map(p=>p.amount).reduce((a,b)=>a+b, 0)
  }

  getLastDotations(){
    const m = moment().subtract(1, 'month');
    return this.props.payments.filter(p=>moment(p.date) > m).length
  }

  getLastDonors(){
    const m = moment().subtract(1, 'month');
    return this.props.payments.filter(p=>moment(p.date) > m).filter((a, idx, arr)=>arr.indexOf(a) === idx ).length
  }

  renderStats(header, amount, dotations, donors){
    return (
      <Segment>
        <Header>{header}</Header>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>{(amount / 100).toFixed(0)}PLN</Statistic.Value>
            <Statistic.Label>Suma zbiórki</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{dotations}</Statistic.Value>
            <Statistic.Label># darowizn</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{donors}</Statistic.Value>
            <Statistic.Label># darczyńców</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    )
  }

  renderPaymentsList(){
    return (
      <List divided>
        {this.props.payments.map((payment, idx) => (<Payment {...payment} key={idx} />))}
      </List>
    )
  }

  renderBestDonators(){
    const payAgg = this.props.payments.reduce((agg, payment)=>{
      const device = payment.donor? payment.donor.deviceId: 'Anonim'
      agg[device]=agg[device] || {donor: payment.donor, amount:0}
      agg[device].amount +=  payment.amount
      return agg
    }, {})

    const aggPayments = Object.values(payAgg).sort(function(a, b){return a.amount-a.amount})

    return (
      <List divided>
        {aggPayments.map((payment, idx) => (<Payment {...payment} key={idx} />))}
      </List>
    )
  }

  renderFreqDonator(){
    const payAgg = this.props.payments.reduce((agg, payment) => {
      const device = payment.donor? payment.donor.deviceId: 'Anonim'
      agg[device]=agg[device] || {donor: payment.donor, amount:0, num: 1}
      agg[device].amount +=  payment.amount
      agg[device].num +=  1
      return agg
    }, {})

    const aggPayments = Object.values(payAgg).sort(function(a, b){return a.num-a.num})

    return (
      <List divided>
        {aggPayments.map((payment, idx) => (<Payment {...payment} key={idx} />))}
      </List>
    )
  }

  renderTabs(){
    const panes = [
      { menuItem: 'Lista płatności', render: () => <Tab.Pane attached={false}>{this.renderPaymentsList()}</Tab.Pane> },
      { menuItem: 'Najczęściej wpłacający', render: () => <Tab.Pane attached={false}>{this.renderFreqDonator()}</Tab.Pane> },
      { menuItem: 'Wpłacający najwięcej', render: () => <Tab.Pane attached={false}>{this.renderBestDonators()}</Tab.Pane> },
    ]
    return (<Tab panes={panes} />)
  }

  render(){
    return (
      <div>
          {this.renderStats("Statystyki globalne", this.getTotalAmount(), this.getDotations(), this.getDotations())}
          {this.renderStats("Statystyki z ostatniego miesiąca",this.getTotalLastAmount(), this.getLastDotations(), this.getLastDotations())}
          {this.renderTabs()}
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  payments: state.payments.payments
});
const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators( actions,dispatch)});
export default connect(mapStateToProps,mapDispatchToProps)( Payments);
