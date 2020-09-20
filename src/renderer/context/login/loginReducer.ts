import { UserStore } from '../../models';
import { Config } from '../../utils';
import { Actions, LoginState } from './loginReducer.model';

const evaluateAuth = (email: string, githubToken: string, authHeader: string) => Boolean(email) && Boolean(githubToken) && Boolean(authHeader);

const generateAuthHeader = (state: LoginState, email: string, githubToken: string): LoginState => {
  const authHeader = `Basic ${btoa(`${email}:${githubToken}`)}`;
  Config.setAuthHeader(authHeader);

  return {
    ...state,
    email,
    githubToken,
    authHeader,
    isAuthenticated: evaluateAuth(email, githubToken, authHeader)
  };
};

const updateLoginCredentials = (state: LoginState, user: UserStore): LoginState => {
  const { email, githubToken } = user;
  return {
    ...state,
    email,
    githubToken,
    isAuthenticated: evaluateAuth(email, githubToken, state.authHeader)
  };
};

export const loginReducer = (state: LoginState, action: Actions): LoginState => {
  switch (action.type) {
    case 'GENERATE_AUTH_HEADER':
      return generateAuthHeader(state, action.email, action.githubToken);
    case 'UPDATE_LOGIN_CREDENTIALS':
      return updateLoginCredentials(state, action.user);
    default:
      return state as never;
  }
};
