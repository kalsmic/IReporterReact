import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';
import { baseURL } from '../../../../utils';

const loginRequest = isLoading => ({
  type: LOGIN_REQUEST,
  isLoading,

});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  message: data.success,
  token: data.token,
  isLoading: false,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
  isLoading: false,
});


export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginRequest(true));
  const url = `${baseURL}/auth/login`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };


  return axios.post(url, { username, password }, config)
    .then(
      (user) => {
        const userData = user.data.data[0];
        sessionStorage.setItem('iReporterToken', userData.token);
        dispatch(loginSuccess(userData));
      },
    ).catch(
      (error) => {
        dispatch(loginFailure(error.response.data.error));
      },
    );
};
