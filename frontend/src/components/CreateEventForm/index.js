import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import "./CreateEventForm.css";

const CreateEventForm = ({ event, isEditting }) => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const group = useSelector((state) => state.groups.singleGroup);

  const [name, setName] = useState(event?.name || "");
  const [type, setType] = useState(event?.type || "");
  const [price, setPrice] = useState(event?.price.toString() || "");
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");
  const [url, setUrl] = useState("");
  const [about, setAbout] = useState(event?.description || "");
  const [isPrivate, setIsPrivate] = useState(isEditting ? group.private : "");

  const [validationErrors, setValidationErrors] = useState({});

  console.log(startDate);

  useEffect(() => {
    if (
      (isEditting && group && Number(group.id) === Number(event["Group"].id)) ||
      (group && Number(group.id) === Number(groupId))
    ) return;
    dispatch(groupActions.thunkGetOneGroup(groupId || event["Group"].id));
  }, [dispatch]);

  if (!group.id) return null;

  const validateInput = () => {
    const errors = {};

    setName(name.trim());
    setPrice(price.trim());
    setAbout(about.trim());
    setUrl(url.trim());

    if (!name)
      errors["name"] = "Name is required";
    if (!type)
      errors["type"] = "Type is required";
    if (
      isPrivate !== true && isPrivate !== false &&
      isPrivate !== "true" && isPrivate !== "false"
    ) errors["private"] = "Privacy is required";
    if (!price)
      errors["price"] = "Price is required (may be zero)";
    if (!startDate)
      errors["startDate"] = "Start date is required";
    if (!endDate)
      errors["endDate"] = "End date is required";
    if (!isEditting && !url.match(/(\.png|\.jpg|\.jpeg)\s*$/))
      errors["url"] = "Preview image url must end with .png, .jpg, or .jpeg";
    if (!about || about.length < 30)
      errors["about"] = "About length must be at least 30 characters"
    if (about & about.length > 1000)
      errors["about"] = "About cannot exceed 1000 characters";

    setValidationErrors(errors);


    return Object.keys(errors).length === 0;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const eventData = {
      id: isEditting ? event.id : undefined,
      name, type, price, startDate, endDate,
      description: about,
      private: isPrivate,
      previewImage: url,
      capacity: 100
    };
    const eventImage = {
      url, preview: true
    };

    dispatch(
      isEditting
        ? eventActions.thunkUpdateEvent(eventData)
        : eventActions.thunkCreateEvent(eventData, group.id)
    )
      .then(async event => {
        if (!isEditting)
          dispatch(
            eventActions.thunkAddEventImage(eventImage, event.id)
          );
        history.push(`/events/${event.id}`);
      })
      .catch(async (res) => {
        const resBody = await res.json();
        setValidationErrors(resBody.errors);
      });
  }

  const returnToGroup = () => {
    history.push(`/groups/${group.id}`);
  }

  const returnToEvent = () => {
    history.push(`/events/${event.id}`);
  }

  if (!group) return null;

  return (
    <div className="create-event-page">
      <div className="return-nav">
        <button
          className="return-button"
          onClick={isEditting ? returnToEvent : returnToGroup}
        >
          Return to {isEditting ? "Ritual" : "Cult"}
        </button>
      </div>
      <form className="create-event-form" onSubmit={onSubmit}>

        <section>
          <h2 className="event-form__title">
            Initiate a ritual for {group.name}
          </h2>
          <p>What is the name of this ritual?</p>
          <input
            value={name}
            placeholder="Ritual Name"
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && <p className="error">{validationErrors.name}</p>}
        </section>


        <section>
          <p>
            Is this an in-person or online ritual?
          </p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={""} hidden disabled>(Select One)</option>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
          {validationErrors.type && <p className="error">{validationErrors.type}</p>}

          <p>
            Is this ritual public or private?
          </p>
          <select
            value={isPrivate}
            onChange={(e) => setIsPrivate(e.target.value)}
          >
            <option value={""} hidden disabled>(Select One)</option>
            <option value={false}>Public</option>
            <option value={true}>Private</option>
          </select>
          {validationErrors.private && <p className="error">{validationErrors.private}</p>}

          <p>What is required value of donations for this ritual?</p>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="price-input"
          />
          {validationErrors.price && <p className="error">{validationErrors.price}</p>}
        </section>


        <section>
          <p>When will this ritual be initiated?</p>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {validationErrors.startDate && <p className="error">{validationErrors.startDate}</p>}

          <p>When will this ritual be complete?</p>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {validationErrors.endDate && <p className="error">{validationErrors.endDate}</p>}
        </section>


        <section>
          {!isEditting &&
            <>
              <p>
                Please add an image url for this ritual:
              </p>
              <input
                type="text"
                value={url}
                placeholder="Image URL"
                onChange={(e) => setUrl(e.target.value)}
              />
              {validationErrors.url && <p className="error">{validationErrors.url}</p>}
            </>
          }

          <p>Please discribe this event</p>
          <textarea
            value={about}
            placeholder="About ritual..."
            rows="6"
            cols="40"
            onChange={(e) => setAbout(e.target.value)}
          />
          {validationErrors.about && <p className="error">{validationErrors.about}</p>}

          <button type="submit">
            {
              isEditting
                ? "Update Ritual"
                : "Create Ritual"
            }
          </button>
        </section>
      </form>
    </div>
  );
}

export default CreateEventForm;