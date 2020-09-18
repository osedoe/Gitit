import React, { FC, ReactElement } from 'react';
import { Route } from 'react-router-dom';

export interface PrivateRouteProps {
  path: string;
  page: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ path, page }) => <Route path={path} element={page}/>;
