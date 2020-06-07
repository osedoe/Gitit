import axios from 'axios';
import { remote } from 'electron';
import { v4 as uuid } from 'uuid';
import { OAuthConfig } from './variables';
import { AccessTokenResponse } from './models';

const { BrowserWindow, dialog, session } = remote;

axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Cache-Control'] = 'no-cache';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const requestAccessToken = (url: string) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then((response: AccessTokenResponse) => {
            console.log(123, response.access_token);
        })
        .catch(error => {
            console.error(error);
        });
};

export const loginUser = async code => {
    const url = `https://${OAuthConfig.hostname}/login/oauth/access_token?client_id=${OAuthConfig.clientId}&client_secret=${OAuthConfig.clientSecret}&code=${code}`;

    await requestAccessToken(url);
};

export const authGithub = () => {
    const authWindow = new BrowserWindow({
        width: 500,
        height: 800,
        show: true
    });

    const UUID = uuid();
    const githubUrl = `https://${OAuthConfig.hostname}/login/oauth/authorize`;
    const authUrl = `${githubUrl}?client_id=${OAuthConfig.clientId}&scope=${OAuthConfig.scope}&login=osedoe&state=${UUID}`;

    const authWindowSession = authWindow.webContents.session;
    authWindowSession.clearStorageData();

    authWindow.loadURL(authUrl);
    authWindow.webContents.openDevTools();
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
            loginUser(code).then(result => {
                console.log('AAA', result);
            });
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

    authWindow.webContents.on('will-navigate', function(event, url) {
        handleCallback(url);
    });
};
