import axiosStatic from 'axios';
import {loginResult} from '../actions';
import {browserHistory} from 'react-router';
import get from 'lodash.get';

const instance = axiosStatic.create();

export function axiosMiddleware({dispatch}) {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (get(error, 'response.status') === 401) {
      localStorage.removeItem('token');
      dispatch(loginResult(false));
      browserHistory.push('/login');
    }
    return Promise.reject(error);
  });
  return (next) => action => next(action);
}

export const axios = instance;
