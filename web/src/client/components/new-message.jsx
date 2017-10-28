import React from 'react';
import {Button, Image} from 'semantic-ui-react'
import DayPicker from 'react-day-picker';
import {Segment, Dropdown, Divider, Form, Input, TextArea} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {donors} from '../actions/index';
import {axios} from '../services/axios';

const messageTypes = [
  {key: 'funding', value: 'funding', text: 'Zbiórka'},
  {key: 'message', value: 'message', text: 'Podziękowania'},
  {key: 'promo', value: 'promo', text: 'Okazja'}
];

const saveButtonStyle = {
  margin: '10px',
  float: 'right',
  display: 'block',
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  backgroundColor: '#0d438e',
  fontSize: '18px',
  color: '#aaa',
  position: 'fixed',
  bottom: 0,
  right: 0
};

class AddNewMessage extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.donors();
  }

  genericOnChange = field => (event, data) => {
    this.setState((prevState) => ({...prevState, [field]: data.value}));
  };

  onChangeType = this.genericOnChange('type');
  onChangeContent = this.genericOnChange('content');
  onChangeTitle = this.genericOnChange('title');
  onChangeDonors = this.genericOnChange('donors');
  onChangeVenue = this.genericOnChange('venue');
  onChangeLat = this.genericOnChange('lat');
  onChangeLng = this.genericOnChange('lng');
  onChangeStartDate = this.genericOnChange('startDate');
  onChangeEndDate = this.genericOnChange('endDate');
  onChangeGoal = this.genericOnChange('goal');
  onChangeDiscount = this.genericOnChange('discount');
  onChangeDonated = this.genericOnChange('donated');
  onChangeCode = this.genericOnChange('code');

  handleSend = () => {
    axios.post('/api/messages', this.state);
    this.setState(() => ({}));
  };

  onFileChange = (event) => {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result;
        this.setState(previousState => ({...previousState, image: `data:${file.type};base64, ${btoa(binaryString)}`}));
      };

      reader.readAsBinaryString(file);
    }
  };

  randerFunding() {
    return (
      <Form>
        <Form.Field>
          <label>Początek zbiórki</label>
          <DayPicker month={new Date(2018, 8)} onChange={this.onChangeStartDate}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Koniec zbiórki</label>
          <DayPicker month={new Date(2018, 8)} onChange={this.onChangeEndDate}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Do zebrania</label>
          <Input placeholder='Wysokość zbiórki' onChange={this.onChangeGoal}/>
        </Form.Field>
      </Form>
    );
  }

  renderPromo() {
    return (
      <Form>
        <Form.Field>
          <label>Miejsce</label>
          <Input placeholder='Miejsce' onChange={this.onChangeVenue}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Szegokość geograficzna</label>
          <Input placeholder='Szerokość geograficzna' onChange={this.onChangeLat}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Długość geograficzna</label>
          <Input placeholder='Długość geograficzna' onChange={this.onChangeLng}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Zniżka</label>
          <Input placeholder='Zniżka' onChange={this.onChangeDiscount}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Dotacja</label>
          <Input placeholder='Dotacja' onChange={this.onChangeDonated}/>
          <Divider/>
        </Form.Field>
        <Form.Field>
          <label>Kod</label>
          <Input placeholder='Kod' onChange={this.onChangeCode}/>
        </Form.Field>
      </Form>
    );
  }

  render() {
    return (
      <Segment>
        <h1>Dodaj nowy wpis</h1>
        <Form>
          <Form.Field>
            <label>Typ wiadomości</label>
            <Dropdown name='type' placeholder='Wybierz darczyńców, do których wiadomość ma trafić...' fluid search
                      selection options={messageTypes} onChange={this.onChangeType}/>
          </Form.Field>

          <Form.Field>
            <label>Darczyńcy</label>
            <Dropdown placeholder='Wybierz darczyńców, do których wiadomość ma trafić...' fluid multiple search
                      selection options={this.props.donors} onChange={this.onChangeDonors}/>
          </Form.Field>

          <Form.Field>
            <label>Tytuł wiadomości</label>
            <Input placeholder='Podaj tytuł wiadomości...' onChange={this.onChangeTitle}/>
          </Form.Field>

          <Form.Field>
            <label>Treść wiadomości</label>
            <TextArea autoHeight placeholder='Podaj treść wiadomości dla darczyńców' onChange={this.onChangeContent}
                      rows={2}/>
          </Form.Field>

          <Form.Field>
            <label>Obraz</label>
            <input type="file" onChange={this.onFileChange}/>
          </Form.Field>

          {this.state.type === 'funding' && this.randerFunding()}
          {this.state.type === 'promo' && this.renderPromo()}

          <Button style={saveButtonStyle} onClick={this.handleSend}>
            Zapisz
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  donors: state.donors.donors
});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMessage);
