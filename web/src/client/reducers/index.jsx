import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';


const payments = (store, action) => {
  switch (action.type) {
    case 'RECEIVE_PAYMENTS':
      return {...store, payments: action.payload}
    default:
      return store || {payments: []};
  }
}


const surveys = (store, action) => {
  switch(action.type) {
    case 'RECEIVE_SURVEYS': return {...store, surveys: action.payload}
    default: return {surveys: []}
  }
}


const login = (store, action) => {
  switch (action.type) {
    case 'LOGIN_RESULT':
      return {...store, loggedIn: action.payload};
    default:
      return store || {loggedIn: false};
  }
}

const donors = (store, action) => {
  switch (action.type) {
    case 'RECEIVE_DONORS': {
      const donors = action.payload || [];
      return {...store, donors: donors.map(donor => ({key: donor._id, value: donor._id, text: donor.email}))};
    }
    default:
      return store || {donors: []};
  }
}

export default combineReducers({
  payments,
  login,
  donors,
  surveys,
  routing: routerReducer
});
