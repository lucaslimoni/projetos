import { signOut } from 'store/modules/auth/actions';
import api from './api';

export default store => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (
        error.response.status === 400 &&
        error.response.data &&
        Array.isArray(error.response.data.errors) &&
        error.response.data.errors.length
      ) {
        const err = error.response.data.errors[0];
        if (err.code === 'UNAUTHENTICATED') {
          store.dispatch(signOut('Sessão expirada!'));
          return Promise.reject();
        }
      }
    }
  );
};
