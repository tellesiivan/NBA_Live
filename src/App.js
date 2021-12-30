import { Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, fetchLiveGames } from "./data/UserInfo/infoActions";
import {
  fetchLast15Games,
  fetchNext15Games,
} from "./data/UserInfo/eventsActions";
import { themeChange } from "./data/UserInfo/settingsActions";
import Layout from "./components/layout/Layout";
import HomeSkeleton from "./components/loads/HomeSkeleton";
import EventsMain from "./components/pages/Events/EventsMain";
import Teams from "./components/pages/teams/Teams";
import TeamDetails from "./components/pages/teamDetails/TeamDetails";
import Main from "./components/pages/Preferences/Main";

const HomeMain = React.lazy(() => import("./components/pages/Home/HomeMain"));

function App() {
  const dispatch = useDispatch();
  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const theme = useSelector((store) => store.userInfo.settings.theme);
  // -----> Load Teams
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(themeChange(theme));
    dispatch(fetchLast15Games());
    dispatch(fetchNext15Games());
  }, [dispatch, theme]);

  let requestFqncy = liveGames ? 60000 : 300000;
  useEffect(() => {
    dispatch(fetchLiveGames());
    const interval = setInterval(() => {
      dispatch(fetchLiveGames());
    }, requestFqncy);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Suspense fallback={<HomeSkeleton />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomeMain />
          </Route>
          <Route path="/teams/:teamId">
            <TeamDetails />
          </Route>
          <Route path="/teams" exact>
            <Teams />
          </Route>
          <Route path="/preferences">
            <Main />
          </Route>
          <Route path="/events/:eventId">
            <HomeSkeleton />
          </Route>
          <Route path="/events">
            <EventsMain />
          </Route>
          <Route path="*">
            {/* 404 */}
            <HomeSkeleton />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
