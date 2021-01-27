import produce from 'immer';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_FAILURE,
  SIGN_OUT,
  SIGN_IN_FORGOT_PASSWORD,
  SIGN_IN_FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  // RESET_PASSWORD
} from './actions';

const INITIAL_STATE = {
  token: null,
  email: null,
  errorMessage: null,
  forgotPasswordMessage: null,
  resetPasswordMessage: null,
  signed: false,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_IN_REQUEST: {
        draft.errorMessage = null;
        draft.forgotPasswordMessage = null;
        draft.loading = true;
        break;
      }

      case SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case SIGN_FAILURE: {
        draft.loading = false;
        draft.errorMessage = action.payload.message;
        break;
      }

      case SIGN_IN_FORGOT_PASSWORD: {
        draft.email = action.payload.email;
        draft.forgotPasswordMessage = null;
        draft.loading = false;
        break;
      }

      case SIGN_IN_FORGOT_PASSWORD_SUCCESS: {
        draft.forgotPasswordMessage = action.payload.forgotPassword;
        break;
      }

      case RESET_PASSWORD_FAILURE: {
        draft.resetPasswordMessage = action.payload.message;
        break;
      }
      case SIGN_OUT: {
        draft.errorMessage = state.errorMessage || action.payload.msg || null;
        draft.signed = false;
        draft.token = null;
        draft.email = null;
        break;
      }

      default:
    }
  });
}
