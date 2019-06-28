import incidentReducer, { initialIncidentState } from '.';
import {
  GET_INCIDENT,
  GET_INCIDENTS,
  INCIDENT_ERROR,
  INCIDENT_REQUEST,
  INCIDENT_SUCCESS
} from '../../actions/types';


describe('Incident Reducer', () => {
  const incident = {
    id: 1,
    type: 'red-flag',
    title: 'my first Incident',
  };

  it('should return the initial state', () => {
    expect(incidentReducer(undefined, {}))
      .toStrictEqual(initialIncidentState);
  });

  it('should set loading status to true on making an incident request', () => {
    expect(incidentReducer(undefined, {
      type: INCIDENT_REQUEST,
    }))
      .toStrictEqual({
        isLoading: true,
        error: {},
        message: '',
        incident: {},
        incidents: [],
      });
  });

  it('should show a success message on successful incident action', () => {
    const message = 'incident created successfully';

    expect(incidentReducer(undefined, {
      type: INCIDENT_SUCCESS,
      message,
      incident,
    }))
      .toStrictEqual({
        message,
        error: {},
        isLoading: false,
        incident,
        incidents: [],
      });
  });

  it('should show an error message on  incident action failure', () => {
    const error = { title: 'Error creating an incident' };
    expect(incidentReducer(undefined, {
      type: INCIDENT_ERROR,
      error,
    }))
      .toStrictEqual({
        message: '',
        error,
        isLoading: false,
        incident: {},
        incidents: [],
      });
  });

  it('should get an incident', () => {
    expect(incidentReducer(undefined, {
      type: GET_INCIDENT,
      incident,
    }))
      .toStrictEqual({
        message: '',
        error: {},
        isLoading: false,
        incident,
        incidents: [],
      });
  });
  it('should get an incidents', () => {
    const incidents = [incident];
    expect(incidentReducer(undefined, {
      type: GET_INCIDENTS,
      incidents,
    }))
      .toStrictEqual({
        message: '',
        error: {},
        isLoading: false,
        incidents,
        incident: {},
      });
  });
});
