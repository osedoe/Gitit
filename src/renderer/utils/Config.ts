import { ipcRenderer } from 'electron';
import { LoginCredentials } from './models';
import { UserStore } from '../models';

const setUserInStore = (email: string, token: string, encodedAuthHeader: string) => {
  Config.setLocalUser({ email, githubAccessToken: token, authHeader: encodedAuthHeader })
    .then(result => {
      console.log('User data saved', result);
    })
    .catch(error => {
      console.error((error));
    });
};

export class Config {
  private static instance: Config;
  private email: string;
  private githubAccessToken: string;
  private authHeader: string;

  private constructor() {
    // Do nothing
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

  static async getLocalUser(): Promise<UserStore> {
    return ipcRenderer.invoke('getLocalUser');
  }

  static setAuthHeader({ email, token }: LoginCredentials): void {
    Config.getInstance().setAuthHeader({ email, token });
  }

  static async setLocalUser(payload): Promise<UserStore> {
    return await ipcRenderer.invoke('setLocalUser', payload) as UserStore;
  }

  private setAuthHeader({ email, token }: LoginCredentials): void {
    const encodedAuthHeader = `Basic ${btoa(`${email}:${token}`)}`;

    this.email = email;
    this.githubAccessToken = token;
    this.authHeader = encodedAuthHeader;
    setUserInStore(email, token, encodedAuthHeader);
  }
}
