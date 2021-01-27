import produce from 'immer';
import { SIGN_IN_SUCCESS, SIGN_OUT } from '~/store/modules/auth/actions';

const INITIAL_STATE = {
  profile: null,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }

      case SIGN_OUT: {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
