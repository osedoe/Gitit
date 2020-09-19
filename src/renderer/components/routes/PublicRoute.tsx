import React, { FC, ReactElement } from 'react';
import { Route } from 'react-router-dom';

export interface PublicRouteProps {
  isAuthenticated: boolean;
  path: string;
  page: ReactElement;
}

export const PublicRoute: FC<PublicRouteProps> = ({ isAuthenticated, path, page }) =>
  <Route path={path} element={page}/>;
