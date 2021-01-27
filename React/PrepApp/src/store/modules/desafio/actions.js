export const CREATE_CHALLENGE = '@desafio/CREATE_CHALLENGE';
export const CREATE_MESSAGE = '@desafio/CREATE_MESSAGE';
export const GET_MESSAGE = '@desafio/GET_MESSAGE';
export const CREATE_MESSAGE_SUCCESS = '@desafio/CREATE_MESSAGE_SUCCESS';
export const CREATE_GET_MESSAGE_SUCCESS = '@desafio/CREATE_GET_MESSAGE_SUCCESS';
export const DATE_SCHANDULE = '@desafio/DATE_SCHANDULE';
export const CREATE_CHALLENGE_SUCCESS = '@desafio/CREATE_CHALLENGE_SUCCESS';
export const UPDATE_CHALLENGE = '@desafio/UPDATE_CHALLENGE';
export const DELETE_CHALLENGE = '@desafio/DELETE_CHALLENGE';
export const DELETE_CHALLENGE_SUCCESS = '@desafio/DELETE_CHALLENGE_SUCCESS';
export const ACTIVATE_CHALLENGE = '@desafio/ACTIVATE_CHALANGE';
export const LIST_CHALLENGE = '@desafio/LIST_CHALLENGE';
export const LIST_SUCCESS = '@desafio/LIST_SUCCESS';
export const StateAll = '@desafio/StateALL';
export const Clear = '@desafio/Clear';
export const Titulo = '@desafio/Titulo';
export const Conteudo = '@desafio/Conteudo';
export const Activity = '@desafio/Activity';
export const Answer = '@desafio/Answer';

export function createChallenge(data) {
  return {
    type: CREATE_CHALLENGE,
    payload: data,
  };
}

export function createChallengeSuccess(data) {
  return {
    type: CREATE_CHALLENGE_SUCCESS,
    payload: { data },
  };
}

export function updateChallenge(data) {
  return {
    type: UPDATE_CHALLENGE,
    payload: data,
  };
}

export function deleteChallenge(idChallenge) {
  return {
    type: DELETE_CHALLENGE,
    payload: { idChallenge },
  };
}

export function deleteChallengeSuccess(data) {
  return {
    type: DELETE_CHALLENGE_SUCCESS,
    payload: { data },
  };
}

export function activateChallenge(data) {
  return {
    type: ACTIVATE_CHALLENGE,
    payload: data,
  };
}

export function listChallenge(payload) {
  return {
    type: LIST_CHALLENGE,
    payload,
  };
}

export function listSuccess(data) {
  return {
    type: LIST_SUCCESS,
    payload: data,
  };
}

export function createMessage(data) {
  return {
    type: CREATE_MESSAGE,
    payload: { data },
  };
}
export function createMessageSuccess(data) {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: { data },
  };
}

export function getMessage() {
  return {
    type: GET_MESSAGE,
  };
}

export function createGetMessageSuccess(data) {
  return {
    type: CREATE_GET_MESSAGE_SUCCESS,
    payload: { data },
  };
}

export function dateSchandule(data) {
  return {
    type: DATE_SCHANDULE,
    payload: { data },
  };
}

export function stateAll(data, edit = false) {
  return {
    type: StateAll,
    payload: { data, edit },
  };
}

export function titulo(data) {
  return {
    type: Titulo,
    payload: { data },
  };
}
export function conteudo(data) {
  return {
    type: Conteudo,
    payload: { data },
  };
}

export function activity(data) {
  return {
    type: Activity,
    payload: { data },
  };
}

export function answer(data) {
  return {
    type: Answer,
    payload: { data },
  };
}

export function clearChallengeRedux() {
  return {
    type: Clear,
  };
}
