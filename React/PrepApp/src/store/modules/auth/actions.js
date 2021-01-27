export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_FAILURE = '@auth/SIGN_FAILURE';
export const SIGN_OUT = '@auth/SIGN_OUT';
export const SIGN_IN_FORGOT_PASSWORD = '@auth/SIGN_IN_FORGOT_PASSWORD';
export const SIGN_IN_FORGOT_PASSWORD_SUCCESS =
  '@auth/SIGN_IN_FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD = '@auth/RESET_PASSWORD';
export const RESET_PASSWORD_FAILURE = '@auth/RESET_PASSWORD_FAILURE';

export function signInRequest(username, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { username, password },
  };
}

export function signInForgotPassword(email) {
  return {
    type: SIGN_IN_FORGOT_PASSWORD,
    payload: { email },
  };
}

export function forgotPasswordSuccess(data) {
  return {
    type: SIGN_IN_FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
}

export function resetPassword(token, password) {
  return {
    type: RESET_PASSWORD,
    payload: { token, password },
  };
}

export function signInSuccess(data) {
  if (data) {
    localStorage.setItem('userData', JSON.stringify(data.user));
  }
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
}

export function signFailure(data) {
  return {
    type: SIGN_FAILURE,
    payload: data,
  };
}

export function resetPasswordFailure(data) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: data,
  };
}

export function signOut(msg) {
  return {
    type: SIGN_OUT,
    payload: { msg },
  };
}
