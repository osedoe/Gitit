import { remote } from 'electron';
import { apiRequest, Methods } from './api-request';
import { OAuthConfig } from './variables';

const { BrowserWindow, dialog } = remote;

export const makeAsyncActionSet = actionName => ({
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`
});

export const LOGIN = makeAsyncActionSet('LOGIN');

export const loginUser = code => {
    console.log('🍓', code);
    // return dispatch => {
    const url = `https://${OAuthConfig.hostname}/login/oauth/access_token`;
    const data = {
        client_id: OAuthConfig.clientId,
        client_secret: OAuthConfig.clientSecret,
        code
    };

    // dispatch({ type: LOGIN.REQUEST });

    // return fetch(url, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Cache-Control': 'no-cache',
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     body: JSON.stringify(data)
    // });

    return apiRequest(url, Methods.POST, data)
        .then(response => {
            console.log('SUCCESS', response);
            // dispatch({
            //     type: LOGIN.SUCCESS,
            //     payload: response.data,
            //     isEnterprise,
            //     hostname
            // });
        })
        .catch(function(error) {
            console.error('ERROR', error);
            // dispatch({ type: LOGIN.FAILURE, payload: error.response.data });
        });
    // };
};

export const authGithub = () => {
    const authWindow = new BrowserWindow({
        width: 500,
        height: 800,
        show: true
    });

    const githubUrl = `https://${OAuthConfig.hostname}/login/oauth/authorize`;
    const authUrl = `${githubUrl}?client_id=${OAuthConfig.clientId}&scope=${OAuthConfig.scope}`;

    const { session } = authWindow.webContents;
    session.clearStorageData();

    authWindow.loadURL(authUrl);
    authWindow.show();

    function handleCallback(url) {
        const raw_code = /code=([^&]*)/.exec(url) || null;
        const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
        const error = /\?error=(.+)$/.exec(url);

        if (code || error) {
            // Close the browser if code found or error
            authWindow.destroy();
        }

        // If there is a code, proceed to get token from github
        if (code) {
            // TODO: Request the token
            loginUser(code);
        } else if (error) {
            alert(
                "Oops! Something went wrong and we couldn't " +
                    'log you in using Github. Please try again.'
            );
        }
    }

    authWindow.on('close', () => {
        authWindow.destroy();
    });

    // @ts-ignore
    authWindow.webContents.on('will-redirect', (event, url) => {
        event.preventDefault();
        handleCallback(url);
    });

    authWindow.webContents.on('will-navigate', function(event, url) {
        handleCallback(url);
    });

    // @ts-ignore
    authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
        handleCallback(newUrl);
    });
};
