import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CreateEventForm from "../Pages/CreateEventForm";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import { useHistory } from "react-router-dom";

const EditEventForm = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.singleEvent);
  const group = useSelector((state) => state.groups.singleGroup);
  const user = useSelector((state) => state.session.user);

  const isCurrentEvent = Number(event.id) === Number(eventId);
  const isCurrentGroup = Number(group.id) === Number(event["Group"]?.id);

  useEffect(() => {
    (async () => {
      let event;
      if (!isCurrentEvent)
        event = await dispatch(eventActions.thunkGetOneEvent(eventId));

      if (!isCurrentGroup)
        dispatch(groupActions.thunkGetOneGroup(event["Group"].id));
    }
    )();
  }, [dispatch])

  const isAuthorized = user.id === group.organizerId;

  if (!isAuthorized)
    history.push("/");

  return (
    <>
      {
        isAuthorized
          ? isCurrentEvent && <CreateEventForm event={event} isEditting={true} />
          : <h2>Not Authorized</h2>
      }
    </>
  );
}

export default EditEventForm;
