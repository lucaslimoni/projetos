import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'prepapp',
      storage,
      whitelist: ['auth', 'user', 'desafio'],
    },
    reducers
  );

  return persistedReducer;
};
