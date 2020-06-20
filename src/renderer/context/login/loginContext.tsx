import React, { useContext, useReducer } from 'react';
import { loginReducer, LoginState } from './loginReducer';

export const INITIAL_LOGIN_STATE: LoginState = {
    username: '',
    accessToken: '',
    isAuthenticated: Boolean(this.username) && Boolean(this.token)
};

const LoginContext = React.createContext(null);

export const LoginProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE);

    return <LoginContext.Provider value={[state, dispatch]}>{children}</LoginContext.Provider>;
};

interface LoginCredentials {
    username?: string;
    token?: string;
}

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
        dispatchSetAuthToken: ({ username, token }: LoginCredentials) =>
            dispatch({ type: 'SET_AUTH_TOKEN', username, token })
    };
};
