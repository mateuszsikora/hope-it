import React from 'react';

import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import { DemoButtons } from './demo-buttons';
import nav from './nav';
import { Button } from 'semantic-ui-react'

class AddNewMessage extends React.Component {
    state = {}
    constructor(props) {
        super(props)
        this.state = {doners: [], donees: [], message: '', selectedDonee: '', selectedDoner: ''}
    }

    componentDidMount() {
        const that = this;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "/api/donees");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText)
                that.setState({ donees: res })
            }
        }
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/doners");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText)
                that.setState({ doners: res })
            }
        }
    }

    isMessageNameValid = (name) => !!name

    addNew = () => {
        const obj = this.state
        console.log(this.state)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/api/messages");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            message: obj.message,
            donee: obj.selectedDonee,
            doner: obj.selectedDoner
        }));
    }

    changeMessage = (obj) =>
        this.setState({ message: obj.target.value })

    onDoneeChange = (e) =>
        this.setState({ selectedDonee: e.target.value })

    onDonerChange = (e) =>
        this.setState({ selectedDoner: e.target.value })

    render() {
        return (
            <div>
                <h1>Dodaj nowy wpis</h1>
                <textarea onChange={this.changeMessage} placeholder="Dodaj nową wiadomość..."></textarea>
                <select onChange={this.onDonerChange} value={this.state.selectedDoner}>
                    <option selected disabled>Select doner</option>
                    {this.state.doners.map(d => 
                        (<option value={d._id}>{d.name}</option>))}
                </select>
                <select onChange={this.onDoneeChange} value={this.state.selectedDonee}>
                    <option selected disabled>Select donee</option>
                    {this.state.donees.map(d => 
                        (<option value={d._id}>{d.name}</option>))}
                </select>
                <button onClick={this.addNew}>Dodaj</button>
            </div>
        )
    }
}

export default () =>
  (<AddNewMessage />);

