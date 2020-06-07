export interface AccessTokenResponse extends Response {
    access_token: string;
    scope: string;
    token_type: string;
}
