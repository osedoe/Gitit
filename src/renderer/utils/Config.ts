import { ipcRenderer } from 'electron';
import { UserStore } from '../models';

export class Config {
  private static instance: Config;

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

  static setAuthHeader(authHeader: string): void {
    Config.getInstance().setAuthHeader(authHeader);
  }

  static async setLocalUser(payload): Promise<UserStore> {
    return await ipcRenderer.invoke('setLocalUser', payload) as UserStore;
  }

  private setAuthHeader(authHeader): void {
    // const encodedAuthHeader = `Basic ${btoa(`${email}:${githubToken}`)}`;
    this.authHeader = authHeader;
  }
}
