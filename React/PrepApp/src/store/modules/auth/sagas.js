import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import api, { graphql } from '~/services/api';
import GraphError from '~/services/errors/graphql';
import env from '~/config/Environment';
import { toast } from 'react-toastify';

import {
  signInSuccess,
  signFailure,
  forgotPasswordSuccess,
  SIGN_IN_REQUEST,
  SIGN_OUT,
  SIGN_IN_FORGOT_PASSWORD,
  RESET_PASSWORD,
  resetPasswordFailure,
} from './actions';

export function* signIn({ payload }) {
  function showError(message) {
    return put(signFailure({ message }));
  }
  try {
    const { username, password } = payload;
    const body = yield call(
      graphql,
      `mutation{
        auth(user: "${username}", password: "${password}")
      }`
    );

    const token = body.auth;
    api.defaults.headers.Authorization = `bearer ${token}`;

    const userData = yield call(
      graphql,
      `query {
        user {
          me {
            id
            name 
            gender 
          }
        }
      }`
    );
    const user = userData.user.me;

    yield put(signInSuccess({ token, user }));

    history.push('/desafios');
  } catch (err) {
    delete api.defaults.headers.Authorization;
    if (err instanceof GraphError) {
      yield showError(err.message);
    } else {
      yield showError('Falha na autenticação.');
    }
  }
}

export function* forgotPassword({ payload }) {
  try {
    const email = payload.email;
    const fP = yield call(
      graphql,
      `mutation{
            forgotPassword(user: "${email}", callbackUrl: "${env.APP_HOST +
        '/esqueciMinhaSenha/alterarSenha'}")
         }`
    );
    yield put(forgotPasswordSuccess(fP));
  } catch (error) {
    if (error instanceof GraphError) {
      yield toast.error(error.message);
    }
  }
}

export function* resetPassword({ payload }) {
  function showError(message) {
    return put(resetPasswordFailure({ message }));
  }
  try {
    const { token, password } = payload;
    const rP = yield call(
      graphql,
      `mutation{
            resetPassword(token: "${token}", password: "${password}")
         }`
    );
    setTimeout(() => {
      history.push('/');
    }, 1000);
  } catch (error) {
    if (error instanceof GraphError) {
      yield showError(error.message);
    }
  }
}

export function setLogin({ payload }) {
  if (!payload) return;

  payload.auth.errorMessage = null;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `bearer ${token}`;
  }
}

export function signOut() {
  localStorage.clear();
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setLogin),
  takeLatest(SIGN_IN_REQUEST, signIn),
  takeLatest(SIGN_IN_FORGOT_PASSWORD, forgotPassword),
  takeLatest(RESET_PASSWORD, resetPassword),
  takeLatest(SIGN_OUT, signOut),
]);
