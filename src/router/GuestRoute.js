import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function GuestRoute({ children, ...restProps }) {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/dailys" />;
  }

  return <Route {...restProps}>{children}</Route>;
}

export default GuestRoute;
