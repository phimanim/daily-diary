import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function GuestRoute({ children, ...restProps }) {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/week" />;
    //seems good here to redirect to current week:id
  }

  return <Route {...restProps}>{children}</Route>;
}

export default GuestRoute;
