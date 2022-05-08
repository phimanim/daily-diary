import {React} from "react";
import { Switch } from "react-router-dom";
import { Auth } from "../pages";
// Daily
import { Daily, NewDaily, DailyUpdate } from "../pages/DailyPages";
// Bookings
import { Profile, Month, Year, Week } from "../pages";
import { AppRoute, GuestRoute } from ".";

function AppRouter() {
  return (
    <Switch>
      <GuestRoute path="/login" exact>
        <Auth isLogin={true} />
      </GuestRoute>
      <GuestRoute path="/signup" exact>
        <Auth />
      </GuestRoute>

      
      {/* 
      <AppRoute exact path="/profile">
        <Profile/>
      </AppRoute>

      <AppRoute exact path="/new-daily">
        <NewDaily/>
      </AppRoute>
      <AppRoute exact path="/daily">
        <Daily />
      </AppRoute>
      <AppRoute exact path="/week:id/:dailyId">
        <DailyUpdate />
      </AppRoute>

      <AppRoute exact path="/month:id">
        <Month />
      </AppRoute>
      <AppRoute exact path="/week:id">
        <Week />
      </AppRoute>
      <AppRoute exact path="/year:id">
        <Year />
      </AppRoute>
       */}
    </Switch>
  );
}

export default AppRouter;
