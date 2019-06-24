import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../../actions/types';

export const initialSignUpState = {
  error: {},
  isLoading: false,
  message: '',
};
const signUpReducer = (state = initialSignUpState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        message: action.message,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: '',
      };

    default:
      return state;
  }
};

export default signUpReducer;
