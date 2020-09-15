import React, { FC } from 'react';
import { Switch } from 'react-router';
import { Home, Login } from '../../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Router: FC = () => {
  return <>
    <PublicRoute path="/login" page={<Login/>}/>
    <PrivateRoute path="/" page={<Home/>}/>
  </>;
};
