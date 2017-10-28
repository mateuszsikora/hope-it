import {axios} from '../services/axios';
import {push} from 'react-router-redux';

export const toggleCheck = () => {
  return {
    type: 'TOGGLE_CHECK'
  };
};

export const incNumber = () => {
  return {
    type: 'INC_NUMBER'
  };
};

export const decNumber = () => {
  return {
    type: 'DEC_NUMBER'
  };
};


export const paymentsReceived = (dt) => ({
  type: 'RECEIVE_PAYMENTS',
  payload: dt.data
});


export const payments = () => (dispatch) => {
  return axios.get('/api/payments').then((dt)=>{console.log(dt); dispatch(paymentsReceived(dt))}, console.error)
};

export const loginResult = (result) => ({
  type: 'LOGIN_RESULT',
  payload: result.data
});

export const login = (credentials) => (dispatch) => {
  return axios.post('/api/login', credentials)
    .then(() => {
      dispatch(loginResult(true));
      dispatch(push('/'));
    }, () => dispatch(loginResult(false)));
};
