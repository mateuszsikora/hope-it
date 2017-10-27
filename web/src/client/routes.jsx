import React from 'react';
import { Route, Link } from 'react-router';
import Home from './components/home';
import AddNewStory from './components/new-story';
import AddNewDonee from './components/new-donee';
import Payments from './components/payments';
import Payu from './components/payu';
import { createWithNav } from './components/nav';
import {Container} from 'semantic-ui-react'
import Login from './components/login';

export const routes = (
  <Container fluid={false} text>
    <Route path="/" component={createWithNav(Home)}/>
    <Route path="/add-new-story" component={createWithNav(AddNewStory)}/>
    <Route path="/add-new-donee" component={createWithNav(AddNewDonee)}/>
    <Route path="/hello" component={createWithNav(() => (
      <span>hello world</span>
    ))}/>
    <Route path="/dupa" component={createWithNav(() => (
      <span>dupa</span>
    ))}/>
    <Route path="/payments" component={createWithNav(() => (
      <Payments />
    ))}/>
    <Route path="/payu" component={Payu} />
    <Route path="/login" component={Login}/>
  </Container>
);
