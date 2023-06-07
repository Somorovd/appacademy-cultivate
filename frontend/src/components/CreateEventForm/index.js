import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import "./CreateEventForm.css";

const CreateEventForm = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.singleGroup);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");
  const [about, setAbout] = useState("");


  useEffect(() => {
    if (group && Number(group.id) === Number(groupId)) return;
    dispatch(groupActions.thunkGetOneGroup(groupId));
  }, [dispatch]);

  const onSubmit = () => {

  }

  if (!group) return null;

  return (
    <div>
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
          <p>What is required value of donations for this ritual?</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
          />
        </section>
        <section>
          <p>When will this ritual be initiated?</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p>When will this ritual be complete?</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </section>
        <section>
          <p>
            Please add an image url for this ritual:
          </p>
          <input
            type="url"
            value={url}
            placeholder="Image URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <p>Please discribe this event</p>
          <textarea
            value={about}
            placeholder="About ritual..."
            rows="6"
            cols="40"
            onChange={(e) => setAbout(e.target.value)}
          />
          <button type="submit">
            Create Ritual
          </button>
        </section>
      </form>
    </div>
  );
}

export default CreateEventForm;