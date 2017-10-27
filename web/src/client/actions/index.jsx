import axios from 'axios';

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


export const paymentsReceived = (dt) => {
  return {
    type: 'RECEIVE_PAYMENTS',
    payload: dt.data
  }
}


export const payments = () => (dispatch) => {
  return axios.get('/api/payments').then((dt)=>{console.log(dt); dispatch(paymentsReceived(dt))}, console.error)
}
