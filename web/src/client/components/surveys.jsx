import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment, List, Image, Label} from 'semantic-ui-react'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Input, Button, Header, Tab, Table, Accordion, Icon } from 'semantic-ui-react'
import moment from 'moment';
import {axios} from '../services/axios';


const itemTextStyle = {marginLeft: 56};
const itemTextStyle2 = {marginLeft: 6};
const addRowStyle = {padding: 5}

class Surveys extends PureComponent {
  static propTypes = {
    surveys: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired
  }
  state = { questions:[], current:'', image:null }

  handleAdd = ()=>{
    this.setState({
      questions: this.state.questions.concat([{question: this.state.current, pool: this.state.pool, image: this.state.image}]),
      current: ''
    })

  }
  handleChange = (e, d) => {
    this.setState({current: d.value })
  }

  componentDidMount(){
    this.props.actions.surveys();
    this.props.actions.answers();
  }

  handleSave = ()=>{
    axios.post('/api/surveys', this.state.questions);
    this.setState({questions:[], current:'', image:null, pool:''})
  }


  handlePool = (e, d)=>{
    this.setState({pool: d.value })
  }

  onFileChange = (event) => {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result;
        this.setState({image: `data:${file.type};base64, ${btoa(binaryString)}`});
      };

      reader.readAsBinaryString(file);
    }
  };

  renderAddQuestion(){
    return (<div style={addRowStyle}>
      <h3>Pytanie</h3>
        <Input key={this.state.questions.length} focus onChange={this.handleChange} />
        <input type="file" name="file" id="file" style={{margin: "0 8px" }} onChange={this.onFileChange}/>
        <Button onClick={this.handleAdd}>+</Button>
      </div>
    )
  }

  renderQuestion = (q, idx)=>{
    return (<List.Item key={idx}>
        {q.image? <Image src={q.image} width={50} height={50} />: ""}
        <span style={!q.image? itemTextStyle:itemTextStyle2}>{q.question}</span>
      </List.Item>
    )
  }

  renderAddSurvey = ()=>{
      return (
        <div>
          <Header>Zleceniodawca: </Header>
          <Input onChange={this.handlePool} />
          <List divided>
            {this.state.questions.map(this.renderQuestion)}
          </List>
          {this.renderAddQuestion()}
          <Button onClick={this.handleSave} positive>Zapisz</Button>
      </div>
      )
    }

  handleActivate = (a, b)=>{
    console.log(a,b)
    this.setState({activeIndex: b.index})
  }

  getPools(){
    return this.props.surveys.map(s=>s.pool).filter((p, idx, all)=>all.indexOf(p) == idx)
  }

  getQuestions(pool){
    return this.props.surveys.filter(s=>s.pool = pool).map(s=>s.question)
  }

  getInfoForRow(pool, question) {
    const dt = this.props.answers.filter(a=>a.survey.pool == pool && a.survey.question == question)
    const succ = dt.filter(x=>x.answear).length
    const fail = dt.filter(x=>!x.answear).length
    const prc = (succ+fail) === 0? 0 : (succ/(succ+fail)*100).toFixed(2)
    return {succ, fail, prc}
  }


  renderResults = () =>{
    const pools = this.getPools()

    const activeIndex = this.state.activeIndex;
    const accordions= pools.map((poolName, i)=>{
        return [
          (
            <Accordion.Title active={activeIndex === i} index={i} key={2*i} onClick={this.handleActivate}>
            <Icon name='dropdown' />
            {poolName}
          </Accordion.Title>),
          (
            <Accordion.Content active={activeIndex === i} key={2*i+1}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Pytanie</Table.HeaderCell>
                <Table.HeaderCell>Pozytywnych odpowiedzi</Table.HeaderCell>
                <Table.HeaderCell>Negatywnych odpowiedzi</Table.HeaderCell>
                <Table.HeaderCell>% pozytywnych</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.getQuestions(poolName).map((question, idx)=>{
                  const {succ, fail, prc} = this.getInfoForRow(poolName, question );
                    return (
                      <Table.Row key={idx}>
                        <Table.Cell>{question}</Table.Cell>
                        <Table.Cell>{succ}</Table.Cell>
                        <Table.Cell>{fail}</Table.Cell>
                        <Table.Cell>{prc}</Table.Cell>
                      </Table.Row>
                    )
                })
              }
            </Table.Body>
          </Table>


        </Accordion.Content>
      )
    ]
      })

    return (
      <Accordion children={[].concat(...accordions)} />
    )

  }

  render(){
    const panes = [
      { menuItem: 'Wyniki', render: () => <Tab.Pane>{this.renderResults()}</Tab.Pane> },
      { menuItem: 'Dodaj', render: () => <Tab.Pane>{this.renderAddSurvey()}</Tab.Pane> },
    ]

    return (
      <Segment>
        <Header>Ankiety </Header>
        <Tab panes={panes} />
      </Segment>
    )

    return this.renderAddSurvey();
  }
}

const mapStateToProps = (state)=> ({
  surveys: state.surveys.surveys,
  answers: state.answers.answers
});
const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators( actions,dispatch)});
export default connect(mapStateToProps,mapDispatchToProps)( Surveys);
