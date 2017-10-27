import React from 'react';
import { Route, Link } from 'react-router';
import Home from './components/home';
import Payments from './components/payments';
import { createWithNav } from './components/nav';
import {Container} from 'semantic-ui-react'

export const routes = (
  <Container fluid={false} text>
    <Route path="/" component={createWithNav(Home)}/>
    <Route path="/hello" component={createWithNav(() => (
      <span>hello world</span>
    ))}/>
    <Route path="/dupa" component={createWithNav(() => (
      <span>dupa</span>
    ))}/>
  <Route path="/payments" component={createWithNav(() => (
      <Payments />
    ))}/>
  </Container>
);
