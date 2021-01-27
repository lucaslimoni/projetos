import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import desafio from './desafio/reducer';
import filemanager from './filemanager/reducer';

export default combineReducers({
  auth,
  user,
  desafio,
  filemanager,
});
