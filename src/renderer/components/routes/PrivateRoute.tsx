import React, { FC, ReactElement, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../context/login/loginContext';

export interface PrivateRouteProps {
  path: string;
  page: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ path, page }) => {
  const navigate = useNavigate();
  const { state } = useLoginContext();

  useEffect(() => {
    if (!state.isAuthenticated) {
      console.log('A', state);
      navigate('/login');
    }
  }, [state.isAuthenticated]);
  console.log('B', state);

  return <Route path={path} element={page}/>;
};
