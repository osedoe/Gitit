import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { Home, Login } from '../../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Router: FC = () => {
  return <Switch>
    <PublicRoute path="/login" page={<Login/>}/>
    <PrivateRoute path="/home" page={<Home/>}/>
  </Switch>;
};
