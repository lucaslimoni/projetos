import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "baggins",
      storage,
      whitelist: ["auth", "user", "CEP", "unsplash"],
    },
    reducers
  );

  return persistedReducer;
};
