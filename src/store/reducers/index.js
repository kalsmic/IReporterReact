import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import incidentReducer from './incidentReducer';


export default combineReducers({
  loginReducer,
  signUpReducer,
  incidentReducer,
});
