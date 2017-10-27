import React from 'react';
import { Route, Link } from 'react-router';
import Home from './components/home';
import Payments from './components/payments';
import Payu from './components/payu';
import { createWithNav } from './components/nav';

export const routes = (
  <div>
    <Route path="/" component={createWithNav(Home)}/>
    <Route path="/hello" component={createWithNav(() => (
      <span>hello world</span>
    ))}/>
    <Route path="/dupa" component={createWithNav(() => (
      <span>dupa</span>
    ))}/>
    <Route path="/payments" component={createWithNav(() => (
      <Payments payments={[{}]} />
    ))}/>
    <Route path="/payu" component={Payu} />
  </div>
);
