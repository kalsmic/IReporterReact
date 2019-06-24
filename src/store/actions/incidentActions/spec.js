import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import mockData, { unauthenticatedResponse } from '../__mocks__/index';
import { middlewares } from '../../index';
import {
  GET_INCIDENT, GET_INCIDENTS, INCIDENT_ERROR, INCIDENT_REQUEST, INCIDENT_SUCCESS
} from '../types';
import { createIncident, getIncident, getIncidents } from './index';

describe('actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const mockStore = configureMockStore(middlewares);

  it('should return the new incident and a message on new incident creation', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: mockData.createIncident.success,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: INCIDENT_SUCCESS,
        message: mockData.createIncident.success.data[0].success,
        incident: mockData.createIncident.success.data[0].incident,
        isLoading: false,
      },
    ];

    return store.dispatch(createIncident('dd', 'dd', 'dd', 'dd', 'dd', 'dd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error when creation of new incident fails', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.createIncident.failure,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: INCIDENT_ERROR,
        isLoading: false,
        error: mockData.createIncident.failure.error,
      },
    ];

    return store.dispatch(createIncident('dd', 'dd', 'dd', 'dd', 'dd', 'dd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should redirect om auth error', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: unauthenticatedResponse,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        error: 'Please login in again or sign up an account to access this resource',
        isLoading: false,
        type: INCIDENT_ERROR,
      },

    ];

    return store.dispatch(createIncident('dd', 'dd', 'dd', 'dd', 'dd', 'dd'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an incident ', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.getIncident.success,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: GET_INCIDENT,
        incident: mockData.getIncident.success.data[0].incident,
        isLoading: false,
      },
    ];

    return store.dispatch(getIncident('dd', 'red-flag'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error for an failure to retrieve an incident ', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: mockData.getIncident.failure,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: INCIDENT_ERROR,
        error: mockData.getIncident.failure.error,
        isLoading: false,
      },
    ];

    return store.dispatch(getIncident('dd', 'red-flags'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return a list of incidents ', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.getIncidents.success,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: GET_INCIDENTS,
        incidents: mockData.getIncidents.success.data,
        isLoading: false,
      },
    ];

    return store.dispatch(getIncidents('red-flags'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error on failure to get incidents', () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: mockData.getIncident.failure,
      });
    });


    const expectedActions = [
      {
        type: INCIDENT_REQUEST,
        isLoading: true,
      },
      {
        type: INCIDENT_ERROR,
        error: mockData.getIncident.failure.error,
        isLoading: false,
      },
    ];

    return store.dispatch(getIncidents('red-flags'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
