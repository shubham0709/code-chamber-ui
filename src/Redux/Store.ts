import { legacy_createStore, combineReducers } from "redux";
import { app, appInitialStateType } from "./App/app.reducer";
import { auth, authInitialStateType } from "./Auth/auth.reducer";

export interface rootStateType {
  app: appInitialStateType;
  auth: authInitialStateType;
}

const rootReducer = combineReducers({
  app,
  auth,
});

export const store = legacy_createStore(rootReducer);
