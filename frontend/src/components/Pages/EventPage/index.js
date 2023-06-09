import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import OpenModalButton from "../../OpenModalButton";
import * as eventActions from "../../../store/events";
import * as groupActions from "../../../store/groups";
import "./EventPage.css";

const formatDate = (d) => {
  if (!d) return null;
  let raw = new Date(d);
  let date = raw.toLocaleDateString('it-IT');
  let [month, day, year] = date.split("/");
  let time = raw.toLocaleTimeString('en-US').split(/(:| )/);
  return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')} \u2022 ${time[0]}:${time[2]} ${time[6]}`;
}

const EventPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events.singleEvent);
  const group = useSelector((state) => state.groups.singleGroup);

  useEffect(() => {
    (async () => {
      const event = await dispatch(eventActions.thunkGetOneEvent(eventId));
      dispatch(groupActions.thunkGetOneGroup(event["Group"].id));
    })();
  }, [dispatch]);

  if (
    !event.id ||
    !group.id ||
    Number(event.id) !== Number(eventId)
  ) return null;

  const eventPreviewImageUrl = event["EventImages"].find((img) => img.preview)?.url;
  const groupPreviewImageUrl = group["GroupImages"].find((img) => img.preview)?.url;

  const onClickEdit = () => {
    history.push(`/events/${eventId}/edit`)
  }

  let actionButtons;

  if (user && user.id === group.organizerId) {
    actionButtons = [
      <button
        className="round purple"
        onClick={onClickEdit}
      >
        Update Ritual
      </button>,
      <OpenModalButton
        buttonText="Delete Ritual"
        buttonClasses="round delete"
        modalComponent={
          <ConfirmDeleteModal
            type="event"
            what={event}
            path={`/groups/${group.id}`}
          />
        }
      />
    ]
  }

  const returnToEvents = () => {
    history.push("/events");
  }

  return (
    event && <>
      <div className="page-wrapper">
        <div className="return-nav">
          <button
            className="skew-left purple"
            onClick={returnToEvents}
          >
            <span>
              Return to All Rituals
            </span>
          </button>
        </div>
        <h2 className="event-details__name">
          {event.name}
        </h2>
        <p className="event-details__host">
          Hosted by:&nbsp;
          <span className="organizer">
            {group["Organizer"].firstName}&nbsp;
            {group["Organizer"].lastName}
          </span>
        </p>
        <section className="event-details-header">
          <img
            src={eventPreviewImageUrl}
            className="event-details__image"
            alt="event"
          />
          <div className="event-details__group-info">
            <img
              src={groupPreviewImageUrl}
              className="event-details__group-image"
              alt="group"
            />
            <div>
              <h3 className="event-details__group-name">
                {group.name}
              </h3>
              <p>{group.private ? "Private" : "Public"}</p>
            </div>
          </div>
          <div className="event-details__event-info">
            <div className="event-details__date">
              <p>START</p>
              <p>{formatDate(event.startDate)}</p>
              <p>END</p>
              <p>{formatDate(event.endDate)}</p>
            </div>
            <div className="event-details__price">
              {event.price > 0 ? event.price : "FREE"}
            </div>
            <div className="event-details__type">
              {event.type}
            </div>
            <div className="event-details__actions">
              {actionButtons}
            </div>
          </div>
        </section>
        <section className="event-details__about">
          <h2>
            Details
          </h2>
          <p>
            {event.description}
          </p>
        </section>
      </div>
    </>
  );
}

export default EventPage;