import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import Payment from './payment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Card, Icon, Image, Accordion, Progress } from 'semantic-ui-react'
import moment from 'moment';

const Event = ({title, shortContent, content, image, goal, raised, handleOpen, isOpen, idx })=>{
  return (
    <Card>
    {image? <Image src={'data:image/png;base64,'+image} /> : null}
    <Card.Content>
      <Card.Header>
        {title}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
        <span className='date'>
          Joined in 2015
        </span>
        <Progress
          percent={(raised/goal)*100}
          success={raised/goal >= 1}
          warning={raised/goal<1 && raised/goal>=0.5}
          error={raised/goal<0.5}
          >
          Uzbierano {(raised/100).toFixed(0)}PLN z {(goal/100).toFixed(0)}PLN
        </Progress>
      </Card.Meta>

      <Card.Content >
        <Accordion>
          <Accordion.Title active={isOpen} index={idx} onClick={handleOpen}>
            <Icon name='dropdown' />
            {shortContent}
          </Accordion.Title>
          <Accordion.Content active={isOpen}>
            <p>{content}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
    </Card.Content>
  </Card>
  )
}

class Home extends PureComponent {
  static propTypes = {
    payments: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }
  state = { activeIndex: 0 }

  componentDidMount(){
    this.props.actions.payments();
  }

  handleOpen = (e, titleProps) => {
     const { index } = titleProps
     const { activeIndex } = this.state
     const newIndex = activeIndex === index ? -1 : index

     this.setState({ activeIndex: newIndex })
  }

  aggregatePayments = ()=>{
    const msgs =this.props.payments
      .filter(p=>p.message)
        .filter(p=>p.message.type == 'funding')
      .reduce((agg, p)=>{
        if(!agg[p.message._id]){
            agg[p.message._id] = p.message
            agg[p.message._id].raised = 0
        }
        agg[p.message._id].raised += p.amount
        return agg
      }, {})
    return Object.values(msgs)
  }

  render(){
    console.log(this.aggregatePayments())
    return (
      <Card.Group>
          {
            this.aggregatePayments().map(
              (p, idx)=>(<Event {...p} key={idx} idx={idx} isOpen={idx===this.state.activeIndex} handleOpen={this.handleOpen}/>)
            )
          }
      </Card.Group>
    )
  }
}

const mapStateToProps = (state)=> ({
  payments: state.payments.payments
});
const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators( actions,dispatch)});
export default connect(mapStateToProps,mapDispatchToProps)( Home);
