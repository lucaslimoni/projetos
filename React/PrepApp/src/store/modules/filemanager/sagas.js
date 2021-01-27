import {
  take,
  fork,
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select,
} from 'redux-saga/effects';
import axios from 'axios';
import { eventChannel, END } from 'redux-saga';
import { graphql, graphqlUpload, createCancelToken } from '~/services/api';
import GraphError from '~/services/errors/graphql';
import {
  treeSuccess,
  treeFailure,
  contentSuccess,
  contentFailure,
  createDirectorySuccess,
  createDirectoryFailure,
  uploadResourceUpdate,
  uploadResourceSuccess,
  uploadResourceFailure,
  LIST_TREE_REQUEST,
  LIST_CONTENT_REQUEST,
  DIRECTORY_CREATE_REQUEST,
  RESOURCE_UPLOAD_REQUEST,
  RESOURCE_UPLOAD_CANCEL_REQUEST,
} from './actions';

let uploadList = [];

function* uploadProgressWatcher(chan, item) {
  // take(END) vai forçar a finalização desse processo, e vai para o bloco finally
  while (true) {
    const progress = yield take(chan);
    yield put(uploadResourceUpdate(item.path, item.name, progress));
  }
}

function createQueryUploader({ query, file, token }) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = graphqlUpload(query, file, token, uploadProgressCb);
  return [uploadPromise, chan];
}

export function* getTree({ payload }) {
  try {
    const { path } = payload;

    const query = `query{
      fileManager {
        tree(path: "${path}")
      }
    }`;

    const res = yield call(graphql, query);
    const data = JSON.parse(res.fileManager.tree);

    yield put(treeSuccess({ data }));
  } catch (err) {
    yield put(treeFailure(GraphError.createError({ err })));
  }
}

export function* getContent({ payload }) {
  try {
    const { path } = payload;

    const query = `query{
      fileManager {
        resources(path: "${path}") {
          route
          contents {
            name
            owner
            path
            url
            type
            lastUpdate
            thumb
            size
          }
        }
      }
    }`;

    const fm = yield call(graphql, query);
    const data = fm.fileManager.resources.contents;

    yield put(contentSuccess({ data }));
  } catch (err) {
    yield put(contentFailure(GraphError.createError({ err })));
  }
}

export function* createDirectory({ payload }) {
  try {
    const { name } = payload;

    const currentPath = yield select(state => state.filemanager.currentPath);

    const query = `mutation {
      fileManager {
        addDirectory(parent: "${currentPath}", name: "${name}")
      }
    }`;

    const res = yield call(graphql, query);
    const newDirectory = JSON.parse(res.fileManager.addDirectory);

    yield put(createDirectorySuccess({ parent: currentPath, newDirectory }));
  } catch (err) {
    yield put(createDirectoryFailure(GraphError.createError({ err })));
  }
}

export function* uploadRequest({ payload }) {
  //
  const currentPath = yield select(state => state.filemanager.currentPath);
  const { file } = payload;
  const query = `mutation($file: Upload!) {
    fileManager {
      upload(path: "${currentPath}" file: $file) {
        name
        owner
        path
        type
        lastUpdate
        thumb
        url
        size
      }
    }
  }`;

  const item = {
    path: currentPath,
    file: file,
    name: file.name,
    task: createCancelToken(),
    isCanceled: false,
  };

  uploadList.push(item);

  try {
    const [uploadPromise, chan] = yield call(createQueryUploader, {
      query,
      file,
      token: item.task,
    });

    yield fork(uploadProgressWatcher, chan, item);

    const res = yield call(() => uploadPromise);

    uploadList = uploadList.filter(el => {
      return !(el.path === item.path && el.name === item.name);
    });

    yield put(
      uploadResourceSuccess(item.path, item.name, res.fileManager.upload)
    );
  } catch (err) {
    uploadList = uploadList.filter(el => {
      return !(el.path === item.path && el.name === item.name);
    });
    if (!axios.isCancel(err)) {
      yield put(
        uploadResourceFailure(
          item.path,
          item.name,
          GraphError.createError({ err })
        )
      );
    }
  }
}

export function uploadsCancel() {
  uploadList.forEach(item => {
    item.isCanceled = true;
    item.task.cancel('Cancelado pelo usuário');
  });
  uploadList = [];
}

export default all([
  takeLatest(LIST_TREE_REQUEST, getTree),
  takeLatest(LIST_CONTENT_REQUEST, getContent),
  takeEvery(DIRECTORY_CREATE_REQUEST, createDirectory),
  takeEvery(RESOURCE_UPLOAD_REQUEST, uploadRequest),
  takeEvery(RESOURCE_UPLOAD_CANCEL_REQUEST, uploadsCancel),
]);
