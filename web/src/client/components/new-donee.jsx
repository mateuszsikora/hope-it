import React from 'react';

import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import { DemoButtons } from './demo-buttons';
import nav from './nav';
import { Button } from 'semantic-ui-react'

const addNewStory = () => {
    console.log('sending new donee');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/donees");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({name:"dupa"}));
}

export default () =>
  (<div>
      <h1>Dodaj nowy wpis</h1>
      <input placeholder="Dodaj nowego obdarowywanego..." />
      <button onClick={addNewStory}>Dodaj</button>
  </div>);
