import { UserStore } from '../../models';

export type LoginReducerType = 'GENERATE_AUTH_HEADER'
  | 'UPDATE_LOGIN_CREDENTIALS';

export enum LoginReducerActions {
  GenerateAuthHeader = 'GENERATE_AUTH_HEADER',
  UpdateLoginCredentials = 'UPDATE_LOGIN_CREDENTIALS'
}

export interface LoginState {
  email?: string;
  githubToken?: string;
  authHeader?: string;
  isAuthenticated?: boolean;
}

export interface BaseAction<T> {
  type: T;
}

export interface GenerateAuthHeaderAction<T> extends BaseAction<T> {
  email?: string;
  githubToken?: string;
}

export interface UpdateLoginCredentialsAction<T> extends BaseAction<T> {
  user?: UserStore;
}

export type Actions = GenerateAuthHeaderAction<LoginReducerActions.GenerateAuthHeader> | UpdateLoginCredentialsAction<LoginReducerActions.UpdateLoginCredentials>;
