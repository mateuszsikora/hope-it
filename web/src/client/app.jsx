//
// This is the client side entry point for the React app.
//

import 'axios-debug-log';
import React from 'react';
import { render } from 'react-dom';
import { routes } from './routes';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import {axiosMiddleware} from './services/axios';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
//

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//
const middleware = routerMiddleware(browserHistory)

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk, axiosMiddleware, middleware, logger];
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

  const l = document.createElement("link");
  l.rel = "stylesheet"
  l.href= "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css";
  document.head.append(l)
};
