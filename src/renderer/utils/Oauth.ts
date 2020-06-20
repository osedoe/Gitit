import { remote } from 'electron';
import { v4 as uuid } from 'uuid';
import { DEFAULT_HEADERS, OAuthConfig } from './variables';
import { AccessTokenResponse } from './models';

const { BrowserWindow, dialog, session } = remote;

export const githubRequest = (params: string, newHeaders?) => {
    const baseUrl = 'https://api.github.com/';
    return fetch(`${baseUrl}${params}`, {
        headers: {
            ...DEFAULT_HEADERS,
            ...newHeaders
        }
    }).then(response => response.json());
};

export const requestWithAuth = (params: string, headers = DEFAULT_HEADERS) => {
    const baseUrl = 'https://api.github.com/';
    return fetch(`${baseUrl}${params}`, {
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
            Authorization: `${window.localStorage.getItem('authHeader')}`
        }
    }).then(response => response.json());
};

/**
 * @deprecated
 */
export const requestAccessToken = (url: string, callback) => {
    fetch(url, {
        method: 'POST',
        headers: {
            ...DEFAULT_HEADERS
        }
    })
        .then(response => response.json())
        .then((response: AccessTokenResponse) => {
            console.log(`Saved accessToken ${response.access_token} in localStorage`);
            window.localStorage.accessToken = response.access_token;
            callback(true);
        })
        .catch(console.error);
};

/**
 * @deprecated
 */
export const getAccessToken = (code: string, callback) => {
    const url = `https://${OAuthConfig.hostname}/login/oauth/access_token?client_id=${OAuthConfig.clientId}&client_secret=${OAuthConfig.clientSecret}&code=${code}`;

    requestAccessToken(url, callback);
};

/**
 * @deprecated
 */
export const authGithub = callback => {
    const authWindow = new BrowserWindow({
        width: 500,
        height: 800,
        show: true
    });

    const UUID = uuid();
    const githubUrl = `https://${OAuthConfig.hostname}/login/oauth/authorize`;
    const authUrl = `${githubUrl}?client_id=${OAuthConfig.clientId}&scope=${OAuthConfig.scope}&login=${OAuthConfig.owner}&state=${UUID}`;

    const authWindowSession = authWindow.webContents.session;
    // This will delete the localStorage token if there's one
    authWindowSession.clearStorageData();

    authWindow.loadURL(authUrl);
    authWindow.webContents.openDevTools();
    authWindow.show();

    const handleCallback = url => {
        const raw_code = /code=([^&]*)/.exec(url) || null;
        const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
        const error = /\?error=(.+)$/.exec(url);

        if (code || error) {
            authWindow.destroy();
        }

        // If there is a code, proceed to get token from github
        if (code) {
            getAccessToken(code, callback);
        } else if (error) {
            alert(
                "Oops! Something went wrong and we couldn't " +
                    'log you in using Github. Please try again.'
            );
        }
    };

    authWindow.on('close', () => {
        authWindow.destroy();
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
        handleCallback(url);
    });
};
