import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
import CEP from "./CEP/reducer";
import unsplash from "./unsplash/reducer";

export default combineReducers({
  auth,
  user,
  CEP,
  unsplash,
});
