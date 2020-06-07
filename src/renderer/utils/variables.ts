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
    scope: ['user:email', 'notifications']
};
