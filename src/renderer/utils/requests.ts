import { remote } from 'electron';
import { DEFAULT_HEADERS } from './variables';
import { Headers } from './models';
import { Config } from './Config';

const { BrowserWindow, dialog, session } = remote;

export const githubRequest = (params: string, extraHeaders: Headers = DEFAULT_HEADERS) => {
    const baseUrl = 'https://api.github.com/';
    return fetch(`${baseUrl}${params}`, {
        headers: {
            ...DEFAULT_HEADERS,
            ...extraHeaders
        }
    }).then(response => response.json());
};

export const pollWithAuth = async (params: string, headers?: Headers) => {
    const pollHeaders = {
        'Last-Modified': '',
        'X-Poll-Interval': '60'
    };
    const response = await requestWithAuth(params, pollHeaders);
    console.log('🍓', response);
    return response;
};

export const requestWithAuth = async (params: string, extraHeaders: Headers = DEFAULT_HEADERS) => {
    const authHeader = {
        ...extraHeaders,
        Authorization: `${Config.getAuthHeader()}`
    };

    return githubRequest(params, authHeader);
};
