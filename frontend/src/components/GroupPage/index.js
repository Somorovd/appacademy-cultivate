import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../EventCard";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import "./GroupPage.css";

const GroupPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const group = useSelector((state) => state.groups.singleGroup);
  const events = useSelector((state) => state.events.allEvents);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(groupActions.thunkGetOneGroup(groupId));
    dispatch(eventActions.thunkGetGroupEvents(groupId));
  }, [dispatch]);

  const returnToGroups = () => {
    history.push("/groups");
  }

  const onClickJoin = () => {
    alert("Feature coming soon!");
  }

  return (
    group && <>
      <div className="group-details-page">
        <div class="return-nav">
          <button
            className="return-button"
            onClick={returnToGroups}
          >
            Return to All Groups
          </button>
        </div>
        <section className="group-details-header">
          <img src={group.previewImage} className="group-details__image" />
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
          {
            user && user.id !== group["Organizer"].id &&
            <button
              className="group-details__join"
              onClick={onClickJoin}
            >
              Join this cult
            </button>
          }
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