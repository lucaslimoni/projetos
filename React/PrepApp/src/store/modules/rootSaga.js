import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import desafio from './desafio/sagas';
import filemanager from './filemanager/sagas';

export default function* rootSaga() {
  yield all([auth, user, desafio, filemanager]);
}
