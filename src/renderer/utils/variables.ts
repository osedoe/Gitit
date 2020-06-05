import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

console.log('🍉', result.parsed);

export const OAuthConfig = {
    oAuthClientId: result.parsed.OAUTH_CLIENT_ID,
    oauthClientSecret: result.parsed.OAUTH_CLIENT_SECRET,
    hostname: result.parsed.HOSTNAME,
    scope: ['user:email', 'notifications']
};
