import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function AppRoute({ children, ...restProps }) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...restProps}>{children}</Route>;
}

export default AppRoute;
