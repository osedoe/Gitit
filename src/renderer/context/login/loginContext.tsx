import React, { useContext, useReducer } from 'react';
import { loginReducer } from './reducer';

const INITIAL_LOGIN_STATE = [];

const LoginContext = React.createContext(null);

export const LoginProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE);

    return <LoginContext.Provider value={[state, dispatch]}>{children}</LoginContext.Provider>;
};

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('Context not found...');
    }
    return context;
};
