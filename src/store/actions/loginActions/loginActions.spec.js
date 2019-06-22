import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/index';
import { middlewares } from '../../index';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';
import { loginUser } from './index';

describe('actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const mockStore = configureMockStore(middlewares);

  it('should return user info on successful login', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.loginUser.success,
      });
    });


    const expectedActions = [
      {
        type: LOGIN_REQUEST,
        isLoading: true,
      },
      {
        message: 'Logged in successfully',
        token: 'x.y.z',
        type: LOGIN_SUCCESS,
        isLoading: false,
      },
    ];

    return store.dispatch(loginUser('admin@ireporter.com', 'Pa$$word123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error message on authentication failure', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: mockData.loginUser.failure,
      });
    });


    const expectedActions = [
      {
        type: LOGIN_REQUEST,
        isLoading: true,
      },
      {
        error: mockData.loginUser.failure.error,
        type: LOGIN_FAILURE,
        isLoading: false,

      },
    ];

    return store.dispatch(loginUser('admin@ireporter.com', 'Pa$$word123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
