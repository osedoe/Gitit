import React, { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';

export interface PrivateRouteProps {
  path: string;
  page: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ path, page }) => {
  return <Route path={path}>{page}</Route>;
};
