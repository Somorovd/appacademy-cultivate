import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import LandingPage from "./components/Pages/LandingPage";
import BrowseGroupsPage from "./components/Pages/BrowseGroupsPage";
import GroupPage from "./components/Pages/GroupPage";
import BrowseEventsPage from "./components/Pages/BrowseEventsPage";
import EventPage from "./components/Pages/EventPage";
import CreateGroupForm from "./components/Pages/CreateGroupForm";
import CreateEventForm from "./components/Pages/CreateEventForm";
import EditGroupForm from "./components/EditGroupForm";
import EditEventForm from "./components/EditEventForm";

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
          <Route path="/groups/:groupId/edit">
            <EditGroupForm />
          </Route>
          <Route path="/groups/:groupId/events/new">
            <CreateEventForm />
          </Route>
          <Route path="/groups/:groupId">
            <GroupPage />
          </Route>
          <Route exact path="/events">
            <BrowseEventsPage />
          </Route>
          <Route path="/events/:eventId/edit">
            <EditEventForm />
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