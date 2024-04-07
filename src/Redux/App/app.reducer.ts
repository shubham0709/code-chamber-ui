import * as types from "./app.actionTypes";

const initialState = {
  createSnippet: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
  },
  allSnippets: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
    data: [],
  },
  editSnippet: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
    data: [],
  },
};

interface reducerParams {
  type: string;
  payload?: any;
}

export const app = (state = initialState, action: reducerParams) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    // switch
    case types.CREATE_SNIPPET_LOADING:
      return {
        ...state,
        createSnippet: {
          ...state.createSnippet,
          isLoading: true,
          isSuccess: false,
          isError: false,
          isErrorMessage: "",
        },
      };

    case types.CREATE_SNIPPET_SUCCESS:
      return {
        ...state,
        createSnippet: {
          ...state.createSnippet,
          isLoading: false,
          isSuccess: true,
          isError: false,
          isErrorMessage: "",
        },
      };

    case types.CREATE_SNIPPET_FAILURE:
      return {
        ...state,
        createSnippet: {
          ...state.createSnippet,
          isLoading: false,
          isSuccess: false,
          isError: true,
          isErrorMessage: payload || "",
        },
      };

    default:
      return state;
  }
};
