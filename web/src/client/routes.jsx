import React from 'react';
import { Route, Link } from 'react-router';
import Home from './components/home';
import AddNewStory from './components/new-story';
import AddNewDonee from './components/new-donee';
import AddNewMessage from './components/new-message';
import Payments from './components/payments';;
import Surveys from './components/surveys';
import Payu from './components/payu';
import { createWithNav } from './components/nav';
import {Container} from 'semantic-ui-react';
import Login from './components/login';
import Thankyou from './components/Thankyou';

export const routes = (
  <Container fluid={false} text>
    <Route path="/" component={createWithNav(Home)}/>
    <Route path="/add-new-message" component={createWithNav(AddNewMessage)}/>

    <Route path="/payments" component={createWithNav(() => (
      <Payments />
    ))}/>
    <Route path="/surveys" component={createWithNav(() => (
      <Surveys />
    ))}/>
    <Route path="/payu" component={Payu} />
    <Route path="/thankyou" component={Thankyou} />
    <Route path="/login" component={Login}/>
  </Container>
);
