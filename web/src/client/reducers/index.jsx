import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

const checkBox = (store, action) => {
  if (action.type === 'TOGGLE_CHECK') {
    return {
      checked: !store.checked
    };
  }

  return store || {checked: false};
};

const number = (store, action) => {
  if (action.type === 'INC_NUMBER') {
    return {
      value: store.value + 1
    };
  } else if (action.type === 'DEC_NUMBER') {
    return {
      value: store.value - 1
    };
  }

  return store || {value: 0};
};


const payments = (store, action) => {
  switch(action.type) {
    case 'RECEIVE_PAYMENTS': return {...store, payments: action.payload}
    default: return {payments: []}
  }
}

const login = (store, action) => {
  switch(action.type) {
    case 'LOGIN_RESULT': return {...store, loggedIn: action.payload};
    default: return {loggedIn: false}
  }
}

const donors = (store, action) => {
  switch(action.type) {
    case 'RECEIVE_DONORS': {
      const donors = action.payload || [];
      return {...store, donors: donors.map(donor => ({key: donor._id, value: donor._id, text: donor.email}))};
    }
    default: return {donors: []}
  }
}

export default combineReducers({
  checkBox,
  number,
  payments,
  login,
  donors,
  routing: routerReducer
});
