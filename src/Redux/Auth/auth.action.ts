import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import * as types from "./auth.actionTypes";
import { baseURL } from "../App/app.actions";

interface User {
  email: string;
  password: string;
}

export const logoutAPI = () => (dispatch: Dispatch) => {
  dispatch({ type: types.USER_LOGOUT });
};

export const registerAPI = (user: User) => async (dispatch: Dispatch) => {
  dispatch({ type: types.USER_REGISTER_LOADING });
  return axios
    .post(`${baseURL}/auth/signup`, user)
    .then((res: AxiosResponse) =>
      dispatch({ type: types.USER_REGISTER_SUCCESS, payload: res.data })
    )
    .catch((err: AxiosError) => dispatch({ type: types.USER_REGISTER_FAILURE, payload: err }));
};

export const loginAPI = (user: User) => async (dispatch: Dispatch) => {
  dispatch({ type: types.USER_LOGIN_LOADING });

  return axios
    .post(`${baseURL}/auth/login`, user)
    .then((res: AxiosResponse) => dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data }))
    .catch((err: AxiosError) => dispatch({ type: types.USER_LOGIN_FAILURE, payload: err }));
};
