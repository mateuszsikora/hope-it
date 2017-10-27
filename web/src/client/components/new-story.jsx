import React from 'react';
import '../styles/normalize.css';
import '../styles/raleway.css';

import skeleton from '../styles/skeleton.css';
import custom from '../styles/custom.css';
import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import { DemoButtons } from './demo-buttons';
import nav from './nav';
import { Button } from 'semantic-ui-react'

const addNewStory = () => {
    console.log('sending new story');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/new-story");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({name:"", time:"2pm"}));
}

export default () =>
  (<div className={custom.container}>
      <h1>Dodaj nowy wpis</h1>
      <textarea placeholder="Dodaj nową wiadomość..."></textarea>
      <select>
        <option value="" disabled selected>Wybierz akcję</option>
        <option value="hora curka">Hora curka</option>
        <option value="stary stefan">stary stefan</option>
      </select>
      <button onClick={addNewStory}>Dodaj</button>
  </div>);

