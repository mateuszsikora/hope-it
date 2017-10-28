import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Input, Button } from 'semantic-ui-react'
import moment from 'moment';
import {axios} from '../services/axios';


class Surveys extends PureComponent {
  static propTypes = {
    surveys: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }
  state = { questions:[], current:'' }

  handleAdd = ()=>{
    this.setState({
      questions: this.state.questions.concat([{question: this.state.current, pool: 'Nokia'}]),
      current: ''
    })

  }
  handleChange = (e, d) => {
    this.setState({current: d.value })
  }

  componentDidMount(){
    this.props.actions.surveys();
  }

  handleSave = ()=>{
    axios.post('/api/surveys', this.state.questions);
    this.setState({questions:[], current:''})
  }

  renderAddQuestion(){
    return (<div>Pytanie: <Input key={this.state.questions.length} focus onChange={this.handleChange} /> <Button onClick={this.handleAdd}>+</Button></div>)
  }

  render(){
    return (
      <div>
        {this.state.questions.map((q, i)=>(<p key={i}>{q.question}</p>))}
        {this.renderAddQuestion()}
        <Button onClick={this.handleSave} />
    </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  surveys: state.surveys.surveys
});
const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators( actions,dispatch)});
export default connect(mapStateToProps,mapDispatchToProps)( Surveys);
