import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EventCard from "../../EventCard";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import OpenModalButton from "../../OpenModalButton";
import GroupImages from "./GroupImages";
import * as groupActions from "../../../store/groups";
import * as eventActions from "../../../store/events";
import "./GroupPage.css";

const GroupPage = () => {
  const CURRENT_DATE = new Date().getTime();
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.groups.singleGroup);
  const eventsState = useSelector((state) => state.events.allEvents);
  const events = Object.values(eventsState).sort((eventA, eventB) => {
    let dateA = new Date(eventA.startDate).getTime();
    let dateB = new Date(eventB.startDate).getTime();
    if (dateA > CURRENT_DATE && dateB > CURRENT_DATE) return dateA - dateB;
    else if (dateA < CURRENT_DATE && dateB < CURRENT_DATE) return dateB - dateA;
    else if (dateA < CURRENT_DATE) return 1;
    else return -1;
  });

  useEffect(() => {
    dispatch(groupActions.thunkGetOneGroup(groupId));
    dispatch(eventActions.thunkGetGroupEvents(groupId));
  }, [dispatch]);

  if (!group.id || Number(group.id) !== Number(groupId)) return null;

  const returnToGroups = () => {
    history.push("/groups");
  };

  const onClickJoin = () => {
    alert("Feature coming soon!");
  };

  const onClickCreate = () => {
    history.push(`/groups/${groupId}/events/new`);
  };

  const onClickEdit = () => {
    history.push(`/groups/${groupId}/edit`);
  };

  const onClickAddImage = () => {
    alert("Add some images!");
  };

  let availableButtons;
  if (user && group) {
    if (Number(user.id) === Number(group["Organizer"].id)) {
      availableButtons = [
        <button
          key={1}
          className="add-group-images round purple"
          onClick={onClickAddImage}
        >
          <i className="fa-regular fa-images"></i>
        </button>,
        <button
          key={2}
          className="create-event round purple"
          onClick={onClickCreate}
        >
          Create Ritual
        </button>,
        <button
          key={3}
          className="edit-group round purple"
          onClick={onClickEdit}
        >
          Edit Cult
        </button>,
        <OpenModalButton
          buttonText="Delete Cult"
          buttonClasses="round delete"
          modalComponent={
            <ConfirmDeleteModal
              type="group"
              what={group}
              path="/groups"
            />
          }
        />,
      ];
    } else {
      availableButtons = [
        <button
          key={1}
          className="group-details__join round blue"
          onClick={onClickJoin}
        >
          Join this cult
        </button>,
      ];
    }
  }

  return (
    group && (
      <>
        <div className="page-wrapper">
          <div className="return-nav">
            <button
              className="skew-left purple"
              onClick={returnToGroups}
            >
              <span>Return to All Cults</span>
            </button>
          </div>
          <section className="group-details-header">
            <GroupImages groupId={group.id} />
            <h2 className="group-details__name">{group.name}</h2>
            <div className="group-details__general-info">
              <div className="detail-row group-details__location">
                <span>
                  <i class="fa-solid fa-map"></i>
                </span>
                <p>
                  {group.city}, {group.state}
                </p>
              </div>
              <div className="detail-row">
                <span>
                  <i class="fa-solid fa-street-view"></i>
                </span>
                <div className="group-details__membership">
                  <p>{group.numMembers} Members</p>
                  <p>&bull;</p>
                  <p>{group.private ? "Private" : "Public"}</p>
                </div>
              </div>
              <div className="detail-row">
                <span>
                  <i class="fa-solid fa-crown"></i>
                </span>
                <p>
                  Organized by&nbsp;
                  <span className="organizer">
                    {group["Organizer"].firstName} {group["Organizer"].lastName}
                  </span>
                </p>
              </div>
            </div>
            <div className="group-details__actions">{availableButtons}</div>
          </section>
          <section className="group-details-body">
            <div className="details-body__organizer">
              <h3>Organizer</h3>
              <p>
                <span className="organizer">
                  {group["Organizer"].firstName} {group["Organizer"].lastName}
                </span>
              </p>
            </div>
            <div className="details-body__about">
              <h3>What we're about</h3>
              <p>{group.about}</p>
            </div>
            <div className="details-body__events">
              <h3>Upcoming Events ({events.length})</h3>
              <div className="details-body__events-list">
                {events &&
                  events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      group={group}
                      hasPassed={
                        new Date(event.startDate).getTime() < CURRENT_DATE
                      }
                    />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </>
    )
  );
};

export default GroupPage;
