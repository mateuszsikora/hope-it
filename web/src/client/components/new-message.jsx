import React from 'react';
import {Button} from 'semantic-ui-react'
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
      <div>
        <div>
          <h2>Początek zbiórki</h2>
          <DayPicker month={new Date(2018, 8)} onChange={this.onChangeStartDate}/>
          <Divider/>
        </div>
        <div>
          <h2>Koniec zbiórki</h2>
          <DayPicker month={new Date(2018, 8)} onChange={this.onChangeEndDate}/>
          <Divider/>
        </div>
        <div>
          <h2>Do zebrania</h2>
          <Input placeholder='Wysokość zbiórki' onChange={this.onChangeGoal}/>
        </div>
      </div>
    );
  }

  renderPromo() {
    return (
      <div>
        <div>
          <h2>Miejsce</h2>
          <Input placeholder='Miejsce' onChange={this.onChangeVenue}/>
          <Divider/>
        </div>
        <div>
          <h2>Szegokość geograficzna</h2>
          <Input placeholder='Szerokość geograficzna' onChange={this.onChangeLat}/>
          <Divider/>
        </div>
        <div>
          <h2>Długość geograficzna</h2>
          <Input placeholder='Długość geograficzna' onChange={this.onChangeLng}/>
          <Divider/>
        </div>
        <div>
          <h2>Zniżka</h2>
          <Input placeholder='Zniżka' onChange={this.onChangeDiscount}/>
          <Divider/>
        </div>
        <div>
          <h2>Dotacja</h2>
          <Input placeholder='Dotacja' onChange={this.onChangeDonated}/>
          <Divider/>
        </div>
        <div>
          <h2>Kod</h2>
          <Input placeholder='Kod' onChange={this.onChangeCode}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Segment>
        <h1>Dodaj nowy wpis</h1>
        <Form>
          <div>
            <h2>Typ wiadomości</h2>
            <Dropdown name='type' placeholder='Wybierz darczyńców, do których wiadomość ma trafić...' fluid search
                      selection options={messageTypes} onChange={this.onChangeType}/>
          </div>

          <div>
            <h2>Darczyńcy</h2>
            <Dropdown placeholder='Wybierz darczyńców, do których wiadomość ma trafić...' fluid multiple search
                      selection options={this.props.donors} onChange={this.onChangeDonors}/>
          </div>

          <div>
            <h2>Tytuł wiadomości</h2>
            <Input placeholder='Podaj tytuł wiadomości...' onChange={this.onChangeTitle}/>
          </div>

          <div>
            <h2>Treść wiadomości</h2>
            <TextArea autoHeight placeholder='Podaj treść wiadomości dla darczyńców' onChange={this.onChangeContent}
                      rows={2}/>
          </div>

          <div>
            <h2>Obraz</h2>
            <input type="file" onChange={this.onFileChange}/>
          </div>

          {this.state.type === 'funding' && this.randerFunding()}
          {this.state.type === 'promo' && this.renderPromo()}

        </Form>
        <div>
          <Button style={saveButtonStyle} onClick={this.handleSend}>
            Zapisz
          </Button>
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  donors: state.donors.donors
});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMessage);
