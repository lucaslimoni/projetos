import axios from 'axios';
import env from '~/config/Environment';
import GraphError from './errors/graphql';

const CancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: env.API_HOST,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
});

export const graphql = async query => {
  const result = await api.post('/graphql', { query });
  const body = result.data;
  if (Array.isArray(body.errors) && body.errors.length) {
    throw new GraphError(body.errors[0]);
  }
  return body.data;
};

export const graphqlUpload = async (
  query,
  file,
  sourceToken,
  onUploadProgress
) => {
  const data = new FormData();
  data.append(
    'operations',
    JSON.stringify({ query, variables: { file: null } })
  );
  data.append('map', JSON.stringify({ file: ['variables.file'] }));
  data.append('file', file);
  const result = await api.post('/graphql', data, {
    onUploadProgress,
    cancelToken: sourceToken ? sourceToken.token : null,
  });

  const body = result.data;
  if (Array.isArray(body.errors) && body.errors.length) {
    throw new GraphError(body.errors[0]);
  }
  return body.data;
};

export const createCancelToken = (executor, callback) => {
  return CancelToken.source();
};

export default api;
