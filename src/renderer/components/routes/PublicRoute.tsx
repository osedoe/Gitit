import React, { FC, ReactElement } from 'react';
import { Route } from 'react-router-dom';

export interface PublicRouteProps {
  path: string;
  page: ReactElement;
}

export const PublicRoute: FC<PublicRouteProps> = ({ path, page }) =>
  <Route path={path} element={page}/>;
