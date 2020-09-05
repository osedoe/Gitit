import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from '../../pages';
import { PrivateRoute } from './PrivateRoute';

export const Router: FC = () => {
  return <Switch>
    <PrivateRoute>
    <Route path="/">
      <Home/>
    </Route>
    </PrivateRoute>
    <Route path="/login">
      <Login/>
    </Route>
  </Switch>;
};
