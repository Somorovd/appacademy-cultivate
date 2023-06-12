import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../../EventCard";
import * as eventActions from "../../../store/events";
import * as groupActions from "../../../store/groups";
import BrowsingNavigation from "../../BrowsingNavigation";

const BrowseEventsPage = () => {
  const dispatch = useDispatch();
  const allEventsState = useSelector((state) => state.events.allEvents);
  const CURRENT_DATE = new Date().getTime();
  const allEvents = Object.values(allEventsState)
    .sort((eventA, eventB) => {
      let dateA = new Date(eventA.startDate).getTime();
      let dateB = new Date(eventB.startDate).getTime();
      if (dateA > CURRENT_DATE && dateB > CURRENT_DATE)
        return dateA - dateB;
      else if (dateA < CURRENT_DATE && dateB < CURRENT_DATE)
        return dateB - dateA;
      else if (dateA < CURRENT_DATE) return 1;
      else return -1;
    });

  useEffect(() => {
    dispatch(eventActions.thunkGetAllEvents());
    // event cards need to have all the groups
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch])

  return (
    <>
      <div className="page-wrapper">
        <BrowsingNavigation />
        <h2 className="browsing-header">Cultivated Rituals</h2>
        <div className="Event-card-list">
          {allEvents && allEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              hasPassed={new Date(event.startDate).getTime() < CURRENT_DATE}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BrowseEventsPage;