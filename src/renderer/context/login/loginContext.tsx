import React, { useContext, useReducer } from 'react';
import { loginReducer, LoginState } from './loginReducer';
import { Config, LoginCredentials } from '../../utils';
import { UserStore } from '../../models';

const init = (): LoginState => {
  const user: UserStore = Config.getStore().get('localUser');
  console.log('🥝', user);

  if (!user) {
    console.log('Empty user - empty');
    return {} as LoginState;
  }
  console.log('Initializing');
  return {
    email: user.email ?? '',
    githubAccessToken: user.githubToken ?? '',
    authHeader: user.authHeader ?? '',
    isAuthenticated: Boolean(user.email) && Boolean(user.githubToken) && Boolean(user.authHeader)
  };
};

export const INITIAL_LOGIN_STATE: LoginState = {
  email: '',
  githubAccessToken: '',
  authHeader: '',
  isAuthenticated: false
};

const LoginContext = React.createContext(null);

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE, init);

  return <LoginContext.Provider value={[state, dispatch]}>{children}</LoginContext.Provider>;
};


interface LoginContext {
  state: LoginState;
  dispatch: () => void;
  dispatchSetAuthToken: (credentials: LoginCredentials) => void;
}

export const useLoginContext = (): LoginContext => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('Context not found...');
  }

  const [state, dispatch] = context;

  return {
    state,
    dispatch,
    dispatchSetAuthToken: ({ email, token }: LoginCredentials) =>
      dispatch({ type: 'SET_AUTH_TOKEN', email, token })
  };
};
