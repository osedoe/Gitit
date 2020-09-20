import React, { FC, ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

export interface PrivateRouteProps {
  isAuthenticated: boolean;
  path: string;
  page: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthenticated, path, page }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true}/>;
  }

  return <Route path={path} element={page}/>;
};
