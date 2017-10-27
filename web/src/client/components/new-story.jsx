import React from 'react';

import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import { DemoButtons } from './demo-buttons';
import nav from './nav';
import { Button } from 'semantic-ui-react'

class AddNewStory extends React.Component {
    state = {}
    constructor(props) {
        super(props)
        this.state = {donees: [], message: '', selectedDonee: ''}
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
                console.log(res)
                that.setState({ donees: res })
            }
        }
    }

    isStoryNameValid = (name) => !!name

    addNew = () => {
        const obj = this.state
        console.log(this.state)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/api/stories");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            message: obj.message,
            donee: obj.selectedDonee
        }));
    }

    changeMessage = (obj) =>
        this.setState({ message: obj.target.value })

    onDoneeChange = (e) =>
        this.setState({ selectedDonee: e.target.value })

    render() {
        return (
            <div>
                <h1>Dodaj nowy wpis</h1>
                <textarea onChange={this.changeMessage} placeholder="Dodaj nową wiadomość..."></textarea>
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
  (<AddNewStory />);

