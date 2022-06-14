import { React } from "react";
import { Switch } from "react-router-dom";
import { Auth } from "../pages";
import { PrivateRoute, GuestRoute } from ".";
import TextEditor from "../components/Text/TextEditor";
import { Profile } from "../pages";
import { Dailys } from "../pages/DailyPages";

function AppRouter() {
  return (
    <Switch>
      <GuestRoute path="/login" exact>
        <Auth isLogin={true} />
      </GuestRoute>
      <GuestRoute path="/signup" exact>
        <Auth />
      </GuestRoute>
      
      <PrivateRoute path="/profile" exact>
        <Profile/>
      </PrivateRoute>
      <PrivateRoute path="/new-daily" exact>
        <TextEditor/>
      </PrivateRoute>
      <PrivateRoute path="/dailys" exact>
        <Dailys/>
      </PrivateRoute>
    </Switch>
  );
}

export default AppRouter;
