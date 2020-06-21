import dotenv from 'dotenv';
import { Headers } from './models';

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

export const OAuthConfig = {
    owner: 'osedoe',
    clientId: result.parsed.OAUTH_CLIENT_ID,
    clientSecret: result.parsed.OAUTH_CLIENT_SECRET,
    hostname: result.parsed.HOSTNAME,
    scope: ['repo', 'notifications']
};

export const DEFAULT_HEADERS: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': '*'
};
