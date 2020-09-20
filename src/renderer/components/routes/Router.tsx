import React, { FC } from 'react';
import { Routes } from 'react-router-dom';
import { Home, Login } from '../../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

interface RouterProps {
  isAuthenticated: boolean;
}

export const Router: FC<RouterProps> = ({ ...props }) => {
  return <Routes>
    <PrivateRoute path="/" page={<Home/>} {...props}/>
    <PublicRoute path="/login" page={<Login/>} {...props}/>
  </Routes>;
};
