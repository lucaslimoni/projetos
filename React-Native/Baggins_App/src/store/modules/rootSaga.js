import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import user from "./user/sagas";
import CEP from "./CEP/sagas";
import unsplash from "./unsplash/sagas";

export default function* rootSaga() {
  yield all([auth, user, CEP, unsplash]);
}
