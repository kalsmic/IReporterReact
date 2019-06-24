import axios from 'axios';
import { authorizationHeader, baseURL } from '../../../../utils';
import {
  GET_INCIDENT, GET_INCIDENTS, INCIDENT_ERROR, INCIDENT_REQUEST, INCIDENT_SUCCESS
} from '../types';

const incidentRequest = isLoading => ({
  type: INCIDENT_REQUEST,
  isLoading,
});


const incidentSuccess = data => ({
  type: INCIDENT_SUCCESS,
  message: data.success,
  incident: data.incident,
  isLoading: false,
});

const getOneIncident = incident => ({
  type: GET_INCIDENT,
  incident,
  isLoading: false,
});

const getManyIncidents = incidents => ({
  type: GET_INCIDENTS,
  incidents,
  isLoading: false,
});

const incidentFailure = error => ({
  type: INCIDENT_ERROR,
  error,
  isLoading: false,
});


export const createIncident = (
  title, comment, incidentLocation, incidentType,
) => (dispatch) => {
  dispatch(incidentRequest(true));

  const url = `${baseURL}/incidents`;

  const incidentData = {
    title,
    comment,
    location: incidentLocation,
    Videos: [],
    Images: [],
    type: incidentType,
  };
  return axios.post(url, incidentData, authorizationHeader)
    .then((response) => {
      const { data: { data: [incidentResponse] } } = response;
      dispatch(incidentSuccess(incidentResponse));
    }).catch((error) => {
      dispatch(incidentFailure(error.response.data.error));
    });
};

export const getIncident = (incidentUUID, incidentType) => (dispatch) => {
  dispatch(incidentRequest(true));

  const url = `${baseURL}/${incidentType}s/${incidentUUID}`;

  return axios.get(url, authorizationHeader)
    .then((response) => {
      const { data: { data: [incidentResponse] } } = response;
      const { location: incidentLocation } = incidentResponse;
      incidentResponse.location = {
        lat: parseFloat(incidentLocation.lat),
        lng: parseFloat(incidentLocation.lng),
      };

      dispatch(getOneIncident(incidentResponse));
    }).catch((error) => {
      dispatch(incidentFailure(error.response.data.error));
    });
};

export const getIncidents = incidentType => (dispatch) => {
  dispatch(incidentRequest(true));

  const url = `${baseURL}/incidents/${incidentType}`;


  return axios.get(url, authorizationHeader)
    .then((response) => {
      const { data: { data } } = response;

      dispatch(getManyIncidents(data));
    }).catch((error) => {
      dispatch(incidentFailure(error.response.data.error));
    });
};
