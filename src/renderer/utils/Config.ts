import storage from 'electron-json-storage';
import { LoginCredentials } from './models';

export class Config {
  private static instance: Config;
  private email: string;
  private githubAccessToken: string;
  private authHeader: string;

  private constructor() {
    // Nothing
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private setAuthHeader({ email, token }: LoginCredentials): void {
    const encodedAuthHeader = `Basic ${btoa(`${email}:${token}`)}`;

    this.email = email;
    this.githubAccessToken = token;
    this.authHeader = encodedAuthHeader;

    storage.set('localUser', { email, githubAccessToken: token, authHeader: encodedAuthHeader }, error => new Notification('Error saving your credentials for easy login', { body: error }));
    const a = storage.getDefaultDataPath();
    console.log('🍉', a);
  }

  static setAuthHeader({ email, token }: LoginCredentials): void {
    Config.getInstance().setAuthHeader({ email, token });
  }

  static getAuthHeader(): string {
    return Config.getInstance().authHeader;
  }
}
