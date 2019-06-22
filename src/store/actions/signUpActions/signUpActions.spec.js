import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import mockData from '../__mocks__/index';
import { middlewares } from '../../index';
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../types';

import { registerUser } from './index';

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
        status: 201,
        response: mockData.registerUser.success,
      });
    });


    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isLoading: true,
      },
      {
        message: 'Account created Successfully',
        type: SIGNUP_SUCCESS,
        isLoading: false,
      },
    ];

    return store.dispatch(registerUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error message on sign up failure', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.registerUser.failure,
      });
    });


    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isLoading: true,
      },
      {
        error: mockData.registerUser.failure.error,
        type: SIGNUP_FAILURE,
        isLoading: false,

      },
    ];

    return store.dispatch(registerUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
