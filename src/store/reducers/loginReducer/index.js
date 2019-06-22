import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER
} from '../../actions/types';

export const initialLoginState = {
  user: {},
  error: '',
  isLoggedIn: false,
  isLoading: false,
  message: '',
};
const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: '',
        user: action.user,
        token: action.token,
        message: action.message,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.error,
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: {},
      };

    default:
      return state;
  }
};

export default loginReducer;
