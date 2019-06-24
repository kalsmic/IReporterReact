import loginReducer, { initialLoginState } from '.';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER
} from '../../actions/types';


describe('login Reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toStrictEqual(initialLoginState);
  });

  it('should set loading to true on login request', () => {
    expect(loginReducer(undefined, {
      type: LOGIN_REQUEST,
      isLoading: true,

    })).toStrictEqual({
      isLoading: true,
      error: '',
      isLoggedIn: false,
      user: {},
      message: '',
    });
  });

  it('should show login success message', () => {
    const user = {
      id: 1,
      firstname: 'Administrator',
      lastname: 'admin',
      othernames: '',
      email: 'admin@ireporter.com',
      phoneNumber: '0772019937',
      username: 'admin',
      registeredOn: 'Fri, 28 Dec 2018 00:00:00 GMT'
    };

    const message = 'Logged in successfully';
    const token = 'x.y.z';

    expect(loginReducer(undefined, {
      type: LOGIN_SUCCESS,
      user,
      message,
      token,

    })).toStrictEqual({
      isLoading: false,
      isLoggedIn: true,
      error: '',
      user,
      message,
      token,
    });
  });

  it('should show login failure message', () => {
    const authError = { error: 'Invalid login credentials' };

    expect(loginReducer(undefined, {
      type: LOGIN_FAILURE,
      error: authError,

    })).toStrictEqual({
      isLoading: false,
      isLoggedIn: false,
      error: authError,
      user: {},
      message: ''
    });
  });

  it('should LOGOUT_USER the user', () => {
    expect(loginReducer(undefined, {
      type: LOGOUT_USER,


    })).toStrictEqual({
      ...initialLoginState,
    });
  });
});
