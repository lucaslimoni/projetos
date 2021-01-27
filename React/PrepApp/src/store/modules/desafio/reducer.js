import produce from 'immer';
import {
  CREATE_CHALLENGE,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_GET_MESSAGE_SUCCESS,
  DELETE_CHALLENGE,
  DELETE_CHALLENGE_SUCCESS,
  LIST_CHALLENGE,
  LIST_SUCCESS,
  ACTIVATE_CHALLENGE,
  UPDATE_CHALLENGE,
  DATE_SCHANDULE,
  StateAll,
  Conteudo,
  Activity,
  Answer,
  Clear,
  Titulo,
} from './actions';

const INITIAL_STATE = {
  data: null,
  result: null,
  searchData: {},
  deleteChallenge: null,
  deleteChallengeSuccessMessage: null,
  createChallengeSuccess: null,
  createMessageSuccess: null,
  createGetMessageSuccess: null,
  activateChallenge: null,
  updateChallenge: null,
  dateSchanduleSuccess: null,
  stateall: null,
  titleChallenge: null,
  conteudoPage: null,
  activityPages: null,
  answerPage: null,
  idChallengeEdit: null,
};

export default function reduce(state = INITIAL_STATE, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case CREATE_CHALLENGE: {
        draft.title = action.payload.data;
        break;
      }
      case CREATE_CHALLENGE_SUCCESS: {
        draft.createChallengeSuccess = action.payload.data;
        break;
      }
      case CREATE_MESSAGE: {
        draft.createMessageSuccess = null;
        break;
      }
      case CREATE_MESSAGE_SUCCESS: {
        draft.createMessageSuccess = action.payload.data;
        break;
      }
      case LIST_CHALLENGE: {
        draft.result = null;
        draft.searchData = action.payload;
        break;
      }

      case LIST_SUCCESS: {
        draft.result = action.payload;
        break;
      }

      case DELETE_CHALLENGE: {
        draft.deleteChallenge = action.payload.idChallenge;
        break;
      }

      case DELETE_CHALLENGE_SUCCESS: {
        draft.deleteChallengeSuccessMessage = action.payload.data;
        break;
      }

      case ACTIVATE_CHALLENGE: {
        draft.activateChallenge = action.payload.idChallenge;
        break;
      }

      case UPDATE_CHALLENGE: {
        draft.updateChallenge = action.payload.idChallenge;
        break;
      }
      case DATE_SCHANDULE: {
        draft.dateSchanduleSuccess = action.payload.data;
        break;
      }

      case StateAll: {
        // if (action.payload.edit) {
        draft.stateall = action.payload.data;
        // }
        if (draft.stateall.title) {
          // draft.titleChallenge = null;
          draft.titleChallenge = draft.stateall.title;
        }
        if (draft.stateall.content) {
          const content = draft.stateall.content;
          let newArr = [];
          content.forEach(el => {
            newArr.push({
              html: el.html,
              navigation: el.navigation,
            });
          });
          draft.conteudoPage = newArr;
        }

        if (draft.stateall.activity) {
          draft.activityPages = draft.stateall.activity;
        }
        if (draft.stateall.answer) {
          // draft.activityPages = null;
          draft.answerPage = draft.stateall.answer;
        }
        if (draft.stateall.id) {
          draft.idChallengeEdit = draft.stateall.id;
        }

        break;
      }

      case Titulo: {
        draft.titleChallenge = action.payload.data;
        break;
      }

      case Conteudo: {
        draft.conteudoPage = action.payload.data;
        break;
      }

      case Activity: {
        draft.activityPages = null;
        draft.activityPages = action.payload.data;
        break;
      }
      case Answer: {
        draft.answerPage = action.payload.data;
        break;
      }

      case CREATE_GET_MESSAGE_SUCCESS: {
        draft.createGetMessageSuccess = action.payload.data;
        break;
      }

      case Clear: {
        draft.createGetMessageSuccess = null;
        draft.createMessageSuccess = null;
        draft.createChallengeSuccess = null;
        draft.stateall = null;
        draft.titleChallenge = null;
        draft.conteudoPage = null;
        draft.activityPages = null;
        draft.answerPage = null;
        draft.dateSchanduleSuccess = null;
        break;
      }
      default:
        break;
    }
  });
}
