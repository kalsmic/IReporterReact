import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';

export default combineReducers({
  loginReducer,
  signUpReducer,
});
