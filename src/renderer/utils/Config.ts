import { LoginCredentials } from './models';

export class Config {
    private static instance: Config;
    private username: string;
    private token: string;
    private authHeader: string;

    // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
    private constructor() {
    }

    static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    private setAuthHeader({ username, token }: LoginCredentials): void {
        this.username = username;
        this.token = token;

        const encodedAuthHeader = `Basic ${btoa(`${username}:${token}`)}`;
        window.localStorage.authHeader = encodedAuthHeader;
        this.authHeader = encodedAuthHeader;
    }

    static setAuthHeader({ username, token }: LoginCredentials): void {
        Config.getInstance().setAuthHeader({ username, token });
    }
}
