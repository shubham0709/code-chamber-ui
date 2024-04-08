import * as types from "./app.actionTypes";

export interface appInitialStateType {
  createSnippet: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isErrorMessage: string;
  };
  allSnippets: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isErrorMessage: string;
    data: any;
  };
  editSnippet: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isErrorMessage: string;
    data: any;
  };
}

const initialState: appInitialStateType = {
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

export interface appReducerParams {
  type: string;
  payload?: any;
}

export const app = (state = initialState, action: appReducerParams): appInitialStateType => {
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
