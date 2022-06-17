import { createStore, combineReducers } from "redux";

import { regFav } from "./reducer";

const rootReducer = combineReducers({
  regState: regFav,
});

export const store = createStore(rootReducer);
