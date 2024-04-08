import axios, { AxiosError, AxiosResponse } from "axios";
import * as types from "./app.actionTypes";
import { Dispatch } from "redux";

// export const baseURL = "https://code-chamber-backend.onrender.com";
export const baseURL = "http://localhost:5002";

const axiosInstance = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};

export const handleCreateCodeSnippet = (dispatch: Dispatch) => {
  dispatch({ type: types.CREATE_SNIPPET_LOADING });
  return axiosInstance()
    .post("/snippet")
    .then((res: AxiosResponse) =>
      dispatch({ type: types.CREATE_SNIPPET_SUCCESS, payload: res.data })
    )
    .catch((err: AxiosError) =>
      dispatch({ type: types.CREATE_SNIPPET_FAILURE, payload: err.message })
    );
};

export const getSnippetById = (id: string) => {
  return axiosInstance().get(`/snippet/${id}`);
};
