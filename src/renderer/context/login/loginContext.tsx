import React, { Reducer, useContext, useReducer } from 'react';
import { loginReducer } from './loginReducer';
import { LoginCredentials } from '../../utils';
import { UserStore } from '../../models';
import { Actions, LoginState } from './loginReducer.model';

export const INITIAL_LOGIN_STATE: LoginState = {
  email: '',
  githubToken: '',
  authHeader: '',
  isAuthenticated: false
};

const LoginContext = React.createContext(null);

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<LoginState, Actions>>(loginReducer, INITIAL_LOGIN_STATE);

  return <LoginContext.Provider value={[state, dispatch]}>{children}</LoginContext.Provider>;
};


interface LoginContext {
  state: LoginState;
  dispatch: () => void;
  dispatchGenerateAuthHeader: (credentials: LoginCredentials) => void;
  dispatchUpdateLoginCredentials: (user: UserStore) => void;
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
    dispatchGenerateAuthHeader: (credentials: LoginCredentials) => {
      const { email, githubToken } = credentials;
      dispatch({ type: 'GENERATE_AUTH_HEADER', email, githubToken });
    },
    dispatchUpdateLoginCredentials: (user: UserStore) => {
      dispatch({ type: 'UPDATE_LOGIN_CREDENTIALS', user });
    }
  };
};
