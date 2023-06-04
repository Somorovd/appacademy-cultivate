import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as eventActions from "../../store/events";

const EventPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.singleEvent);

  useEffect(() => {
    dispatch(eventActions.thunkGetOneEvent(eventId));
  }, [dispatch]);

  return (
    event && <>
      <h2>Page for Event {event.name}</h2>
    </>
  );
}

export default EventPage;