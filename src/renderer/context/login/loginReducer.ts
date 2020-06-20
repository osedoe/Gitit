type LoginReducerType = 'SET_AUTH_TOKEN';

export interface LoginState {
    username?: string;
    accessToken?: string;
    isAuthenticated?: boolean;
}

interface LoginReducer {
    type: LoginReducerType;

    [key: string]: any;
}

export const loginReducer = (state: LoginState, action: LoginReducer): LoginState => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return setToken(state, action.username, action.token);
        default:
            return state as never;
    }
};

const setToken = (state: LoginState, username: string, token: string): LoginState => {
    window.localStorage.authHeader = `Basic ${btoa(`${username}:${token}`)}`;

    return {
        ...state,
        username,
        accessToken: token
    };
};
