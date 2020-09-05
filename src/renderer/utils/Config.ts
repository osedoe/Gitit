import { LoginCredentials } from './models';

export class Config {
    private static instance: Config;
    private email: string;
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

    private setAuthHeader({ email, token }: LoginCredentials): void {
        this.email = email;
        this.token = token;

        const encodedAuthHeader = `Basic ${btoa(`${email}:${token}`)}`;
        window.localStorage.authHeader = encodedAuthHeader;
        this.authHeader = encodedAuthHeader;
    }

    static setAuthHeader({ email, token }: LoginCredentials): void {
        Config.getInstance().setAuthHeader({ email, token });
    }

    static getAuthHeader(): string {
        return Config.getInstance().authHeader;
    }
}
