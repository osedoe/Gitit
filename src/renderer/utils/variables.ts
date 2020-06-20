import dotenv from 'dotenv';

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

export const HEADERS = {
    // 'Accept': 'application/vnd.github.v3+json',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': '*'
};
