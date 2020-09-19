import { ipcRenderer } from 'electron';
import { LoginCredentials } from './models';
import { UserStore } from '../models';

const setUserInStore = (email: string, githubAccessToken: string, authHeader: string) => {
  Config.setLocalUser({ email, githubAccessToken, authHeader })
    .then(() => {
      console.log('User data saved');
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
    return await ipcRenderer.invoke('getLocalUser');
  }

  static generateAuthHeader({ email, githubToken }: LoginCredentials): void {
    Config.getInstance().generateAuthHeader({ email, githubToken });
  }

  static async setLocalUser(payload): Promise<UserStore> {
    return await ipcRenderer.invoke('setLocalUser', payload) as UserStore;
  }

  private generateAuthHeader(user: LoginCredentials): void {
    const { email, githubToken } = user;
    const encodedAuthHeader = `Basic ${btoa(`${email}:${githubToken}`)}`;

    // TODO: The lines below shouldn't be here
    this.email = email;
    this.githubAccessToken = githubToken;
    this.authHeader = encodedAuthHeader;
    setUserInStore(email, githubToken, encodedAuthHeader);
  }
}
