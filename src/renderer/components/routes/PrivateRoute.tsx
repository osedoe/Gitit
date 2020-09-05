import React, { FC, ReactNode } from 'react';
import storage from 'electron-json-storage';
import { Redirect, Route } from 'react-router-dom';
import { useLoginContext } from '../../context/login/loginContext';

export interface PrivateRouteProps {
  path: string;
  page: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ path, page }) => {
  const { state } = useLoginContext();

  if (storage.has('localUser')) {
    return <Redirect to="/login"/>;
  }

  return <Route path={path}>{page}</Route>;
};
