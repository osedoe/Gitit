type LoginReducerType = 'SET_AUTH_TOKEN';

interface LoginReducer {
    type: LoginReducerType;

    [key: string]: any;
}

export const loginReducer = (state, action: LoginReducer) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return setToken(state, action.username, action.token);
        default:
            return state as never;
    }
};

const setToken = (state: any, username: string, token: string) => {
    window.localStorage.authHeader = `Basic ${btoa(`${username}:${token}`)}`;

    return {
        ...state,
        username,
        accessToken: token
    };
};
