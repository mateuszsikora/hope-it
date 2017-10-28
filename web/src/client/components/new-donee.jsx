import React from 'react';

import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import { DemoButtons } from './demo-buttons';
import nav from './nav';
import { Button } from 'semantic-ui-react'

class AddNewDonee extends React.Component {
    state = {}
    constructor(props) {
        super(props)
        this.state = {doneeName: ''}
    }

    isDoneeNameValid = (name) => !!name

    addNew = () => {
        const doneeName = this.state.doneeName;
        
        if (!this.isDoneeNameValid(doneeName))
            return

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/api/donees");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({name: doneeName}));
    }

    changeName = (obj) =>
        this.setState({ doneeName: obj.target.value })

    render() {
        return (
            <div>
                <h1>Dodaj nowego obdarowywanego</h1>
                <input onChange={this.changeName} placeholder="Nazwa..." />
                <button onClick={this.addNew}>Dodaj</button>
            </div>
        )
    }
}

export default () =>
  (<AddNewDonee />);

