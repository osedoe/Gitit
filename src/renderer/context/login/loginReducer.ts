import { Config } from '../../utils';
import { UserStore } from '../../models';

type LoginReducerType = 'GENERATE_AUTH_HEADER'
  | 'INIT_LOCAL_USER';

export interface LoginState {
  email?: string;
  githubToken?: string;
  authHeader?: string;
  isAuthenticated?: boolean;
}

interface LoginReducer {
  type: LoginReducerType;

  [key: string]: any;
}

const generateAuthHeader = (state: LoginState, email: string, githubToken: string): LoginState => {
  Config.generateAuthHeader({ email, githubToken });

  return {
    ...state,
    email,
    githubToken,


    isAuthenticated: Boolean(email) && Boolean(githubToken)
  };
};

const initLocalUser = (state: LoginState, user: UserStore) => {
  const { email, githubToken, authHeader } = user;
  return {
    ...state,
    email,
    githubToken,
    authHeader
  };
};

export const loginReducer = (state: LoginState, action: LoginReducer): LoginState => {
  switch (action.type) {
    case 'GENERATE_AUTH_HEADER':
      return generateAuthHeader(state, action.email, action.token);
    case 'INIT_LOCAL_USER':
      return initLocalUser(state, action.user);
    default:
      return state as never;
  }
};
