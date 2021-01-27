export const CLEAR_ERROR = '@fm/CLEAR_ERROR';
export const LIST_TREE_REQUEST = '@fm/FM_LIST_TREE_REQUEST';
export const LIST_TREE_SUCCESS = '@fm/FM_LIST_TREE_SUCCESS';
export const LIST_TREE_FAILURE = '@fm/FM_LIST_TREE_FAILURE';
export const LIST_CONTENT_REQUEST = '@fm/FM_LIST_CONTENT_REQUEST';
export const LIST_CONTENT_SUCCESS = '@fm/FM_LIST_CONTENT_SUCCESS';
export const LIST_CONTENT_FAILURE = '@fm/FM_LIST_CONTENT_FAILURE';
export const DIRECTORY_CREATE_REQUEST = '@fm/FM_DIRECTORY_CREATE_REQUEST';
export const DIRECTORY_CREATE_SUCCESS = '@fm/DIRECTORY_CREATE_SUCCESS';
export const DIRECTORY_CREATE_FAILURE = '@fm/DIRECTORY_CREATE_FAILURE';
export const RESOURCE_UPLOAD_REQUEST = '@fm/RESOURCE_UPLOAD_REQUEST';
export const RESOURCE_UPLOAD_SUCCESS = '@fm/RESOURCE_UPLOAD_SUCCESS';
export const RESOURCE_UPLOAD_CANCEL_REQUEST =
  '@fm/RESOURCE_UPLOAD_CANCEL_REQUEST';
export const RESOURCE_UPLOAD_FAILURE = '@fm/RESOURCE_UPLOAD_FAILURE';
export const RESOURCE_UPLOAD_CLEAR_UPLOADS =
  '@fm/RESOURCE_UPLOAD_CLEAR_UPLOADS';
export const RESOURCE_UPLOAD_UPDATE = '@fm/RESOURCE_UPLOAD_UPDATE';

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function treeRequest(path) {
  return {
    type: LIST_TREE_REQUEST,
    payload: { path },
  };
}

export function treeSuccess(data) {
  return {
    type: LIST_TREE_SUCCESS,
    payload: data,
  };
}

export function treeFailure(err) {
  return {
    type: LIST_TREE_FAILURE,
    payload: err,
  };
}

// Content

export function contentRequest(path) {
  return {
    type: LIST_CONTENT_REQUEST,
    payload: { path },
  };
}

export function contentSuccess(data) {
  return {
    type: LIST_CONTENT_SUCCESS,
    payload: data,
  };
}

export function contentFailure(err) {
  return {
    type: LIST_CONTENT_FAILURE,
    payload: err,
  };
}

// Create directory

export function createDirectoryRequest(name) {
  return {
    type: DIRECTORY_CREATE_REQUEST,
    payload: { name },
  };
}

export function createDirectorySuccess(data) {
  return {
    type: DIRECTORY_CREATE_SUCCESS,
    payload: data,
  };
}

export function createDirectoryFailure(err) {
  return {
    type: DIRECTORY_CREATE_FAILURE,
    payload: err,
  };
}

// Upload files

export function uploadResourceRequest(file) {
  return {
    type: RESOURCE_UPLOAD_REQUEST,
    payload: { file },
  };
}

export function uploadResourceUpdate(path, name, progress) {
  return {
    type: RESOURCE_UPLOAD_UPDATE,
    payload: { path, name, progress },
  };
}

export function uploadResourceSuccess(path, name, data) {
  return {
    type: RESOURCE_UPLOAD_SUCCESS,
    payload: { path, name, data },
  };
}

export function uploadResourceCancelRequest() {
  return {
    type: RESOURCE_UPLOAD_CANCEL_REQUEST,
  };
}

export function uploadResourceClear() {
  return {
    type: RESOURCE_UPLOAD_CLEAR_UPLOADS,
  };
}

export function uploadResourceFailure(path, name, err) {
  return {
    type: RESOURCE_UPLOAD_FAILURE,
    payload: { path, name, err },
  };
}
