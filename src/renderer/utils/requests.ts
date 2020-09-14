import { DEFAULT_HEADERS } from './variables';
import { Headers } from './models';
import { Config } from './Config';

export const githubRequest = (params: string, extraHeaders: Headers = DEFAULT_HEADERS) => {
  const baseUrl = 'https://api.github.com/';
  return fetch(`${baseUrl}${params}`, {
    headers: {
      ...DEFAULT_HEADERS,
      ...extraHeaders
    }
  }).then(response => response.json());
};

export const pollWithAuth = async (params: string, extraHeaders?: Headers) => {
  const pollHeaders = {
    'X-Poll-Interval': '60',
    ...extraHeaders
    // 'Last-Modified': '', // new Date(obj).toISOString()
    // Link: ?
  };

  const response = await requestWithAuth(params, pollHeaders);
  console.log('☑️', 'Making request with Auth', response);
  return response;
};

export const requestWithAuth = async (params: string, extraHeaders: Headers = DEFAULT_HEADERS) => {
  const authHeader = {
    ...extraHeaders,
    Authorization: `${Config.getAuthHeader()}`
  };

  return githubRequest(params, authHeader);
};
