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

export const loginUser = (authOptions, code) => {
    console.log('🍓', OAuthConfig.hostname);
    return dispatch => {
        const url = `https://${OAuthConfig.hostname}/login/oauth/access_token`;
        const data = {
            client_id: authOptions.clientId,
            client_secret: authOptions.clientSecret,
            code
        };

        // dispatch({ type: LOGIN.REQUEST });

        return apiRequest(url, Methods.POST, data)
            .then(function(response) {
                // dispatch({
                //     type: LOGIN.SUCCESS,
                //     payload: response.data,
                //     isEnterprise,
                //     hostname
                // });
            })
            .catch(function(error) {
                // dispatch({ type: LOGIN.FAILURE, payload: error.response.data });
            });
    };
};

export const authGithub = () => {
    // Build the OAuth consent page URL
    const authWindow = new BrowserWindow({
        width: 500,
        height: 800,
        show: true
    });

    const githubUrl = `https://${OAuthConfig.hostname}/login/oauth/authorize`;
    const authUrl = `${githubUrl}?client_id=${OAuthConfig.oAuthClientId}&scope=${OAuthConfig.scope}`;

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
            debugger;
            // dispatch(loginUser(authOptions, code));
        } else if (error) {
            alert(
                "Oops! Something went wrong and we couldn't " +
                    'log you in using Github. Please try again.'
            );
        }
    }

    // If "Done" button is pressed, hide "Loading"
    authWindow.on('close', () => {
        authWindow.destroy();
    });

    // authWindow.webContents.on(
    //     'did-fail-load',
    //     (event, errorCode, errorDescription, validatedURL) => {
    //         if (validatedURL.includes(OAuthConfig.hostname)) {
    //             authWindow.destroy();
    //             dialog.showErrorBox(
    //                 'Invalid Hostname',
    //                 `Could not load https://${OAuthConfig.hostname}/.`
    //             );
    //         }
    //     }
    // );

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
