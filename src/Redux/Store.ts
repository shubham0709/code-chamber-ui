import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { auth } from "./Auth/auth.reducer";
import { app } from "./App/app.reducer";

const rootReducer = combineReducers({
  app,
  auth,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
