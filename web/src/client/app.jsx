//
// This is the client side entry point for the React app.
//

import React from 'react';
import { render } from 'react-dom';
import { routes } from './routes';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import moment from 'moment';
import 'moment/locale/pl';
import {axiosMiddleware} from './services/axios';
import { syncHistoryWithStore, routerMiddleware, push} from 'react-router-redux';

moment.locale('pl');

//

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//
const middleware = routerMiddleware(browserHistory)
const customMiddleware = store => next => action => {
  if (!store.getState().login.loggedIn) {
    if (action.type === '@@router/LOCATION_CHANGE' && !action.payload.pathname.startsWith('/login')) {
      return next(push('/login'));
    }
  }
  next(action);
};

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk, axiosMiddleware, /*customMiddleware,*/ middleware, logger];
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  const history = syncHistoryWithStore(browserHistory, store);

  render(
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>,
    document.querySelector('.js-content')
  );

  [
    '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css',
    'https://unpkg.com/react-day-picker@6.2.1/lib/style.css',
  ].forEach(css => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = css;
    document.head.append(l);
  });
};
