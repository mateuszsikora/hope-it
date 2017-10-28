import {axios} from '../services/axios';
import {push} from 'react-router-redux';


export const paymentsReceived = (dt) => ({
  type: 'RECEIVE_PAYMENTS',
  payload: dt.data
});


export const payments = () => (dispatch) => {
  return axios.get('/api/payments').then((dt)=>{console.log(dt); dispatch(paymentsReceived(dt))}, console.error)
};


export const surveysReceived = (dt) => ({
  type: 'RECEIVE_SURVEYS',
  payload: dt.data
});


export const surveys = () => (dispatch) => {
  return axios.get('/api/surveys').then((dt)=>{console.log(dt); dispatch(surveysReceived(dt))}, console.error)
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

export const donorsReceived = (dt) => ({
  type: 'RECEIVE_DONORS',
  payload: dt.data
});

export const donors = () => (dispatch) => {
  return axios.get('/api/donors').then((dt)=> dispatch(donorsReceived(dt)), console.error)
};
