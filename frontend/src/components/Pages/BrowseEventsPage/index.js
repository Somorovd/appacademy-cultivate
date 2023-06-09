import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../../EventCard";
import * as eventActions from "../../../store/events";
import * as groupActions from "../../../store/groups";
import BrowsingNavigation from "../../BrowsingNavigation";

const BrowseEventsPage = () => {
  const dispatch = useDispatch();
  const allEventsState = useSelector((state) => state.events.allEvents);
  const allEvents = Object.values(allEventsState);

  useEffect(() => {
    dispatch(eventActions.thunkGetAllEvents());
    // event cards need to have all the groups
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch])

  return (
    <>
      <div className="page-wrapper">
        <BrowsingNavigation />
        <h2>Cultivated Rituals</h2>
        <div className="Event-card-list">
          {allEvents && allEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BrowseEventsPage;