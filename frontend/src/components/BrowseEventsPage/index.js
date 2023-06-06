import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../EventCard";
import * as eventActions from "../../store/events";
import BrowsingNavigation from "../BrowsingNavigation";

const BrowseEventsPage = () => {
  const dispatch = useDispatch();
  const allEventsState = useSelector((state) => state.events.allEvents);
  const allEvents = Object.values(allEventsState);

  useEffect(() => {
    dispatch(eventActions.thunkGetAllEvents());
  }, [dispatch])

  return (
    <>
      <BrowsingNavigation />
      <h2>Events In {"<site here>"}</h2>
      <div className="Event-card-list">
        {allEvents && allEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}

export default BrowseEventsPage;