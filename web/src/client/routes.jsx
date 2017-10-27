import React from 'react';
import { Route, Link } from 'react-router';
import Home from './components/home';
import AddNewStory from './components/new-story';
import Payments from './components/payments';
import { createWithNav } from './components/nav';
import Login from './components/login';
export const routes = (
  <div>
    <Route path="/" component={createWithNav(Home)}/>
    <Route path="/add-new-story" component={createWithNav(AddNewStory)}/>
    <Route path="/hello" component={createWithNav(() => (
      <span>hello world</span>
    ))}/>
    <Route path="/dupa" component={createWithNav(() => (
      <span>dupa</span>
    ))}/>

    <Route path="/payments" component={createWithNav(() => (
      <Payments payments={[{}]} />
    ))}/>
    <Route path="/login" component={Login}/>
  </div>
);
