import * as types from "./auth.actionTypes";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface authInitialStateType {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  login: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
  };
  register: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
  };
}

const isAuthString: string | null = localStorage.getItem("isAuth");
const userString: string | null = localStorage.getItem("user");
const tokenString: string | null = localStorage.getItem("token");

const isAuth: boolean = isAuthString ? JSON.parse(isAuthString) : false;
const user: User | null = userString ? JSON.parse(userString) : null;
const token: string | null = tokenString ? JSON.parse(tokenString) : null;

const initialState: authInitialStateType = {
  user,
  token,
  isAuth,
  // Separate states for login and registration
  login: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  register: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

export interface authReducerParams {
  type: string;
  payload: any;
}

export const auth = (state = initialState, { type, payload }: authReducerParams) => {
  switch (type) {
    case types.USER_REGISTER_LOADING:
      return {
        ...state,
        register: {
          isLoading: true,
          isSuccess: false,
          isError: false,
          errorMessage: "",
        },
      };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          isLoading: false,
          isSuccess: true,
          isError: false,
          errorMessage: "",
        },
      };
    case types.USER_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMessage: payload,
        },
      };

    case types.USER_LOGIN_LOADING:
      return {
        ...state,
        login: {
          isLoading: true,
          isSuccess: false,
          isError: false,
          errorMessage: "",
        },
      };
    case types.USER_LOGIN_SUCCESS: {
      const { user, token } = payload;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuth", JSON.stringify(true));

      return {
        ...state,
        user: user,
        token: token,
        isAuth: true,
        login: {
          isLoading: false,
          isSuccess: true,
          isError: false,
          errorMessage: "",
        },
      };
    }

    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        login: {
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMessage: payload,
        },
      };
    case types.USER_LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      return {
        ...initialState,
        user: null,
        token: "",
        isAuth: false,
        login: {
          isLoading: false,
          isSuccess: false,
          isError: false,
          errorMessage: "",
        },
        register: { ...initialState.register },
      };
    default:
      return state;
  }
};
