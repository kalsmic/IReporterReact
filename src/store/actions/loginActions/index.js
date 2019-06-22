import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';

const loginRequest = isLoading => ({
  type: LOGIN_REQUEST,
  isLoading

});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  user: data.user,
  message: data.message,
  token: data.token,
  isLoading: false,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
  isLoading: false,
});

const baseURL = 'https://ireporterapiv1.herokuapp.com/api/v1/';


export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginRequest(true));
  const url = `${baseURL}auth/login`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };


  return axios.post(url, { username, password }, config)
    .then(
      (user) => {
        dispatch(loginSuccess(user.data.data[0]));
      }
    ).catch(
      (error) => {
        dispatch(loginFailure(error.response.data.error));
      }
    );
};