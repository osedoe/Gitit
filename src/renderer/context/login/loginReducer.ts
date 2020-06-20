export const loginReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return setToken(state, action.token);
        case 2:
            return 1;
        default:
            return state;
    }
};

const setToken = (state: any, token: string) => {
    console.log(`Saved accessToken ${token} in localStorage`);
    window.localStorage.accessToken = token;
    return {
        ...state,
        token
    };
};
