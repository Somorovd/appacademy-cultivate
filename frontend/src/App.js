import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import BrowseGroupsPage from "./components/BrowseGroupsPage";
import GroupPage from "./components/GroupPage";
import BrowseEventsPage from "./components/BrowseEventsPage";
import EventPage from "./components/EventPage";
import CreateGroupForm from "./components/CreateGroupForm";
import EditGroupForm from "./components/EditGroupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkGetSession())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/groups">
            <BrowseGroupsPage />
          </Route>
          <Route path="/groups/new">
            <CreateGroupForm />
          </Route>
          <Route path="/groups/:groupId/Edit">
            <EditGroupForm />
          </Route>
          <Route path="/groups/:groupId">
            <GroupPage />
          </Route>
          <Route exact path="/events">
            <BrowseEventsPage />
          </Route>
          <Route path="/events/:eventId">
            <EventPage />
          </Route>
        </Switch>
      }
    </>
  );
}

export default App;