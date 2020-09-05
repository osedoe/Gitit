import { Config } from '../../utils';

type LoginReducerType = 'SET_AUTH_TOKEN';

export interface LoginState {
  email?: string;
  githubAccessToken?: string;
  authHeader?: string;
  isAuthenticated?: boolean;
}

interface LoginReducer {
  type: LoginReducerType;

  [key: string]: any;
}

const setToken = (state: LoginState, email: string, token: string): LoginState => {
  Config.setAuthHeader({ email, token });

  return {
    ...state,
    email,
    githubAccessToken: token,
    isAuthenticated: Boolean(email) && Boolean(token)
  };
};

export const loginReducer = (state: LoginState, action: LoginReducer): LoginState => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return setToken(state, action.username, action.token);
    default:
      return state as never;
  }
};
