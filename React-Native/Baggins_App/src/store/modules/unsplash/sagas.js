import { takeLatest, call, put, all } from "redux-saga/effects";
import { apiUnsplash } from "~/services/api.js";
import { CALL_UNSPLASH, CALL_UNSPLASH_SUCCESS } from "./actions";

// s/photos/travel?orientation=portrait

export function* callUnsplash() {
  try {
    const list = yield call(apiUnsplash.get("s/photos/travel"), {
      params: { orientation: "portrait" },
    });
    console.log(list);
  } catch (error) {}
}

export default all([takeLatest(CALL_UNSPLASH, callUnsplash)]);
