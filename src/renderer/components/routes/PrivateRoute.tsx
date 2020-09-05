import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useLoginContext } from "../../context/login/loginContext";

export interface PrivateRouteProps {
  children?: any;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useLoginContext();

  if (!state) { // TODO: state.user || state.isAuthenticated
    return <Redirect to="/login"/>;
  }
  return children;
};
