import signUpReducer, { initialSignUpState } from '.';
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../../actions/types';


describe('Sign up Reducer', () => {
  it('should return the initial state', () => {
    expect(signUpReducer(undefined, {})).toStrictEqual(initialSignUpState);
  });

  it('should set loading to true on signup request', () => {
    expect(signUpReducer(undefined, {
      type: SIGNUP_REQUEST,
      isLoading: true,

    })).toStrictEqual({
      isLoading: true,
      error: {},
      message: '',
    });
  });

  it('should show signup success message', () => {
    const message = 'Account created Successfully';

    expect(signUpReducer(undefined, {
      type: SIGNUP_SUCCESS,
      message,

    })).toStrictEqual({
      isLoading: false,
      error: {},
      message,

    });
  });

  it('should show sign up failure error', () => {
    const error = {
      firstname: 'firstname error',
      lastname: 'last name error',
      username: 'Username error',
      password: 'password error',
      email: 'Please provide a valid email address',
      phoneNumber: 'Phone number error',
    };

    expect(signUpReducer(undefined, {
      type: SIGNUP_FAILURE,
      error,

    })).toStrictEqual({
      isLoading: false,
      message: '',
      error,
    });
  });
});
