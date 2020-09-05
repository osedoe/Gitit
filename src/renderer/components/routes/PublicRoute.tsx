import React, { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';

export interface PublicRouteProps {
  path: string;
  page: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ path, page }) => {
  return <Route path={path}>{page}</Route>;
};
