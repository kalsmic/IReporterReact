import {
  GET_INCIDENT, GET_INCIDENTS, INCIDENT_ERROR, INCIDENT_REQUEST, INCIDENT_SUCCESS
} from '../../actions/types';


export const initialIncidentState = {
  incident: {},
  incidents: [],
  error: {},
  message: '',
  isLoading: false,
};

const incidentReducer = (state = initialIncidentState, action) => {
  switch (action.type) {
    case INCIDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case INCIDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        incident: action.incident,
        message: action.message,
      };
    case INCIDENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: '',
      };
    case GET_INCIDENT:
      return {
        ...state,
        isLoading: false,
        message: '',
        incident: action.incident,
      };
    case GET_INCIDENTS:
      return {
        ...state,
        isLoading: false,
        message: '',
        incidents: action.incidents
      };

    default:
      return state;
  }
};


export default incidentReducer;
