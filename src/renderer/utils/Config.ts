import * as ElectronStore from 'electron-store';
import { LoginCredentials } from './models';

export class Config {
  private static instance: Config;
  private email: string;
  private githubAccessToken: string;
  private authHeader: string;
  private store: ElectronStore;

  private constructor() {
    this.store = new ElectronStore();
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  static getAuthHeader(): string {
    return Config.getInstance().authHeader;
  }

  static getStore(): ElectronStore {
    return Config.getInstance().store;
  }

  static setAuthHeader({ email, token }: LoginCredentials): void {
    Config.getInstance().setAuthHeader({ email, token });
  }

  private setAuthHeader({ email, token }: LoginCredentials): void {
    const encodedAuthHeader = `Basic ${btoa(`${email}:${token}`)}`;

    this.email = email;
    this.githubAccessToken = token;
    this.authHeader = encodedAuthHeader;

    this.store.set('localUser', { email, githubAccessToken: token, authHeader: encodedAuthHeader });
    console.log('🍉', this.store.get('localUser'));
  }


}
