import produce from "immer";

import { CALL_UNSPLASH, CALL_UNSPLASH_SUCCESS } from "./actions";

const INITIAL_STATE = {
  unsplashSuccess: null,
};

export default function reduce(state = INITIAL_STATE, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CALL_UNSPLASH: {
        break;
      }
      case CALL_UNSPLASH_SUCCESS: {
        draft.unsplashSuccess = action.payload.data;
        break;
      }
      default:
    }
  });
}
