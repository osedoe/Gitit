import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { Home, Login } from '../../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Router: FC = () => {
  return <Routes>
    <PrivateRoute path="/" page={<Home/>}/>
    <PublicRoute path="/login" page={<Login/>}/>
  </Routes>;
};
