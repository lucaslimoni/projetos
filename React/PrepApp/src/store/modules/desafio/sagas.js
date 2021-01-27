import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { graphql } from '~/services/api';
import GraphError from '~/services/errors/graphql';

import {
  CREATE_CHALLENGE,
  CREATE_MESSAGE,
  createChallengeSuccess,
  createMessageSuccess,
  DELETE_CHALLENGE,
  LIST_CHALLENGE,
  ACTIVATE_CHALLENGE,
  listChallenge,
  listSuccess,
  deleteChallengeSuccess,
  UPDATE_CHALLENGE,
  createGetMessageSuccess,
  GET_MESSAGE,
} from './actions';
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

function toGraphQLString(value) {
  const str = JSON.stringify(value);
  return str.replace(/"(\w+)":/g, function(x) {
    return x.substring(0, x.length - 2).substring(1) + ':';
  });
}

function message(e) {
  toast.error(e);
}

export function* create({ payload }) {
  try {
    const { title, start, content, activity, answer } = payload;
    const conteudo = toGraphQLString(content);
    const atividade = toGraphQLString(activity);

    const mutation_ = `mutation{
      challenge{
        add(
          input:{
            ${title ? `title: "${title}"` : ''}
            ${start ? `start: "${start}"` : ''}
            ${
              conteudo !== '[{html:"",navigation:[]}]'
                ? `content: ${conteudo}`
                : ''
            }
            ${atividade !== '[]' ? `activity: ${atividade}` : ''}
            ${answer ? `answer: "${answer}"` : ''}
          }
        ){
          id
        }
      }
    }`;
    const id = yield call(graphql, mutation_);
    yield put(createChallengeSuccess(id.challenge.add.id));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        const str = el.path;
        let search = str.indexOf('content[');
        if (search !== -1) {
          const str2 = str.split('.');
          message(str2[2] + ' ' + str2[1].slice(0, -3) + ' ' + el.message);
        } else {
          message(el.path + ' ' + el.message);
        }
      });
    }
  }
}

export function* listAll({ payload }) {
  const merged = Object.assign({ page: 1, limit: 20 }, payload);

  let { status, search, page, limit } = merged;
  status = status === 'all' ? 'DRAFT FINISHED ACTIVE' : status.toUpperCase();

  try {
    const data = yield call(
      graphql,
      `query{
        challenge{
          listPaginate(
            ${search ? 'search: ' + '"' + search + '"' : ''}
            page: ${page}
            limit: ${limit}
            status: [${status}]
            ){
              docs {
                id
                title
                createdAt
                updatedAt
                startContent
                startActivity
                endActivity
                startAnswer
                content {
                  id
                  html
                  navigation {
                    index
                    title
                  }
                }
                activity{
                  html
                  alternatives{
                    letter
                    html
                    isCorrect
                  }
                }
                answer
                status
                phase
                fulfilled
              }
              limit
            page
            totalPages
            totalDocs
            hasNextPage
            hasPrevPage
          }
        }
      }`
    );
    yield put(listSuccess(data.challenge.listPaginate));
  } catch (error) {
    if (error instanceof GraphError) {
      yield message(error.message);
    }
  }
}

export function* deleteChallenge({ payload }) {
  try {
    const id = payload.idChallenge;

    const challengeReturn = yield call(
      graphql,
      `mutation{
        challenge {
          delete(id:"${id}")
        }
      }
    `
    );

    yield put(deleteChallengeSuccess(challengeReturn.challenge.delete));

    const searchData = yield select(state => state.desafio.searchData);

    yield put(listChallenge(searchData));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        message(el.message);
      });
    }
  }
}

export function* activateChallenge({ payload }) {
  try {
    const idChallenge = payload;
    yield call(
      graphql,
      `mutation{
        challenge{
          activate(id: "${idChallenge}")
        }
      }`
    );

    const searchData = yield select(state => state.desafio.searchData);

    yield put(listChallenge(searchData));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        message(el.message);
      });
    }
  }
}

export function* updateChallenge({ payload }) {
  try {
    const { id, title, start, content, activity, answer } = payload;

    const conteudo = toGraphQLString(content);
    const atividade = toGraphQLString(activity);

    const mutation_ = `mutation{
        challenge{
          update(
            id: "${id}"
            input:{
              ${title ? 'title: ' + '"' + title + '"' : ''}
            ${start ? 'start: ' + '"' + start + '"' : ''}
            ${
              conteudo !== '[{html:"",navigation:[]}]'
                ? 'content: ' + conteudo
                : ''
            }
            ${atividade !== '[]' ? 'activity: ' + atividade : ''}
            ${answer.length > 0 ? 'answer: ' + '"' + answer + '"' : ''}
            }
          ){
            id
          }
        }
      }`;

    const update = yield call(graphql, mutation_);
    yield put(createChallengeSuccess(update));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        const str = el.path;
        let search = str.indexOf('content[');
        if (search !== -1) {
          const str2 = str.split('.');
          message(str2[2] + ' ' + str2[1].slice(0, -3) + ' ' + el.message);
        } else {
          message(el.path + ' ' + el.message);
        }
      });
    }
  }
}

export function* getMessage() {
  try {
    const query_ = `query 
    Message {
      metadata(key: NO_CHALLENGE_MESSAGE){
        value
      }
    }`;

    const response = yield call(graphql, query_);
    yield put(createGetMessageSuccess(response.metadata.value));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        message(el.message);
      });
    }
  }
}

export function* createMessage({ payload }) {
  try {
    const { data } = payload;
    const mutation_ = `mutation{
      updateMetadata(
        key: NO_CHALLENGE_MESSAGE, 
        value: "${data}") 
        {
          id
          key
          value
        }
    }`;
    const response = yield call(graphql, mutation_);
    yield put(createMessageSuccess(response.updateMetadata.id));
  } catch (error) {
    const errorsValidations = error.validations;
    yield message(error.message);
    if (errorsValidations) {
      errorsValidations.forEach(el => {
        message(el.message);
      });
    }
  }
}

export default all([
  takeLatest(CREATE_CHALLENGE, create),
  takeLatest(CREATE_MESSAGE, createMessage),
  takeLatest(GET_MESSAGE, getMessage),
  takeLatest(LIST_CHALLENGE, listAll),
  takeLatest(DELETE_CHALLENGE, deleteChallenge),
  takeLatest(ACTIVATE_CHALLENGE, activateChallenge),
  takeLatest(UPDATE_CHALLENGE, updateChallenge),
]);
