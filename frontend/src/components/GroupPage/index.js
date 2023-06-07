import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../EventCard";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import OpenModalButton from "../OpenModalButton";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import "./GroupPage.css";

const GroupPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.groups.singleGroup);
  const eventsState = useSelector((state) => state.events.allEvents);
  const events = Object.values(eventsState);

  useEffect(() => {
    dispatch(groupActions.thunkGetOneGroup(groupId));
    dispatch(eventActions.thunkGetGroupEvents(groupId));
  }, [dispatch]);

  if (
    !group.id ||
    Number(group.id) !== Number(groupId)
  ) return null;

  const images = group["GroupImages"];
  const previewImageUrl = images.find((img) => img.preview)?.url;

  const returnToGroups = () => {
    history.push("/groups");
  }

  const onClickJoin = () => {
    alert("Feature coming soon!");
  }

  const onClickCreate = () => {
    history.push(`/groups/${groupId}/events/new`);
  }

  const onClickEdit = () => {
    history.push(`/groups/${groupId}/edit`);
  }

  let availableButtons;
  if (user && group) {
    if (Number(user.id) === Number(group["Organizer"].id)) {
      availableButtons = [
        <button key={1}
          className="create-event"
          onClick={onClickCreate}
        >
          Create Ritual
        </button>,
        <button key={2}
          className="edit-group"
          onClick={onClickEdit}
        >
          Edit Cult
        </button>,
        <OpenModalButton
          buttonText="Delete Cult"
          modalComponent={<ConfirmDeleteModal groupId={groupId} />}
        />
      ];
    }
    else {
      availableButtons = [
        <button key={1}
          className="group-details__join"
          onClick={onClickJoin}
        >
          Join this cult
        </button>
      ];
    }
  }

  return (
    group && <>
      <div className="group-details-page">
        <div className="return-nav">
          <button
            className="return-button"
            onClick={returnToGroups}
          >
            Return to All Groups
          </button>
        </div>
        <section className="group-details-header">
          <img src={previewImageUrl} className="group-details__image" />
          <div className="group-details__general-info">
            <h2 className="group-details__name">
              {group.name}
            </h2>
            <p className="group-details__location">
              {group.city}, {group.state}
            </p>
            <div className="group-details__membership">
              <p>
                {group.numMembers} Members
              </p>
              <p>&bull;</p>
              <p>
                {group.private ? "Private" : "Public"}
              </p>
            </div>
            <p>
              Organized by&nbsp;
              <span className="organizer">
                {group["Organizer"].firstName} {group["Organizer"].lastName}
              </span>
            </p>
          </div>
          <div className="group-details__actions">
            {availableButtons}
          </div>
        </section>
        <section className="group-details-body">
          <div className="details-body__organizer">
            <h3>
              Organizer
            </h3>
            <p>
              <span className="organizer">
                {group["Organizer"].firstName} {group["Organizer"].lastName}
              </span>
            </p>
          </div>
          <div className="details-body__about">
            <h3>
              What we're about
            </h3>
            <p>
              {group.about}
            </p>
          </div>
          <div className="details-body__events">
            <h3>
              Upcoming Events (#)
            </h3>
            <div className="details-body__events-list">
              {
                events && events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default GroupPage;