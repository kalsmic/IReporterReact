import axios from 'axios';
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../types';
import { baseURL } from '../../../../utils';

const registerRequest = isLoading => ({
  type: SIGNUP_REQUEST,
  isLoading,

});

const registerSuccess = data => ({
  type: SIGNUP_SUCCESS,
  message: data.success,
  isLoading: false,
});

const registerFailure = error => ({
  type: SIGNUP_FAILURE,
  error,
  isLoading: false,
});


/**
 * @param {string } email
 * @param {string } password
 * @param {string } username
 * @returns {string} success message on success
 * @returns {string} error message on failure
 * */
export const registerUser = (
  username,
  email,
  password,
) => (dispatch) => {
  dispatch(registerRequest(true));
  const url = `${baseURL}/auth/signup`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  return axios.post(url, {
    username,
    email,
    password,

  }, config)
    .then(
      (user) => {
        dispatch(registerSuccess(user.data.data[0]));
      },
    )
    .catch(
      (error) => {
        dispatch(registerFailure(error.response.data.error));
      },
    );
};
