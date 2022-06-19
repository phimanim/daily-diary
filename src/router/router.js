import { React } from "react";
import { Switch } from "react-router-dom";
import { Auth } from "../pages";
import { PrivateRoute, GuestRoute } from ".";
import TextEditor from "../components/Text/TextEditor";
import { Dailys, Daily } from "../pages/DailyPages";
import RichEditor from "../components/Text/RichEditor";
import DateRange from "../pages/DateRange";

function AppRouter() {
  return (
    <Switch>
      <GuestRoute path="/login" exact>
        <Auth isLogin={true} />
      </GuestRoute>
      <GuestRoute path="/signup" exact>
        <Auth />
      </GuestRoute>

      <PrivateRoute path="/date-search" exact>
        <DateRange />
      </PrivateRoute>
      
      <PrivateRoute path="/new-daily" exact>
        <TextEditor />
      </PrivateRoute>
      <PrivateRoute path="/dailys/:dailyId" exact>
        <Daily />
      </PrivateRoute>
      <PrivateRoute path="/dailys" exact>
        <Dailys />
      </PrivateRoute>
      <PrivateRoute path="/dailys/:dailyId/update" exact>
        <RichEditor/>
      </PrivateRoute>
    </Switch>
  );
}

export default AppRouter;
