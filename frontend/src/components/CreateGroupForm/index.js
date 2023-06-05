import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/groups";
import "./CreateGroupForm.css";

const CreateGroupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("In Person");
  const [isPrivate, setIsPrivate] = useState(false);
  const [url, setUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateInput = () => {
    const errors = {};

    setCity(city.trim());
    setState(state.trim());
    setName(name.trim());
    setAbout(about.trim());
    setUrl(url.trim());

    if (!city)
      errors["city"] = "City is required";
    if (!state)
      errors["state"] = "State is required";
    if (!name)
      errors["name"] = "Name is required";
    if (name && name.length > 60)
      errors["name"] = "Name cannot exceed 60 characters";
    if (!about || about.length < 30)
      errors["about"] = "About length must be at least 30 characters"
    if (about & about.length > 1000)
      errors["about"] = "About cannot exceed 1000 characters";
    if (!url)
      errors["url"] = "Preview image url is required";
    if (!url.match(/(\.png|\.jpg|\.jpeg)\s*$/))
      errors["url"] = "Preview image url must end with .png, .jpg, or .jpeg";

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const groupData = {
      name, city, state, about, type, private: isPrivate
    };

    const groupImage = {
      url, preview: true
    };

    return dispatch(groupActions.thunkCreateGroup(groupData))
      .then(group => {
        dispatch(groupActions.thunkAddGroupImage(groupImage, group.id))
        history.push(`/groups/${group.id}`)
      })
      .catch(async (res) => {
        const resBody = await res.json();
        setValidationErrors(resBody.errors);
      });

  }

  return (
    <div>
      <form className="create-group-form" onSubmit={onSubmit}>
        <section>
          <p>Become and Organizer</p>
          <p>Become and Organizer</p>
        </section>
        <section>
          <h3>First, set your cult's location.</h3>
          <p>
            Cultivate cults meet locally, in person and online. We'll connect you with people in your area,
            and more will join you online.
          </p>
          <div className="location-inputs">
            <div>
              <input
                value={city}
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              {validationErrors.city && <p className="error">{validationErrors.city}</p>}
            </div>
            <div>
              <input
                value={state}
                type="text"
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
              />
              {validationErrors.state && <p className="error">{validationErrors.state}</p>}
            </div>
          </div>
        </section>
        <section>
          <h3>What is the name of your cult?</h3>
          <p>
            Choose a name that will give people a clear idea of what the cult is about and which entity you serve.
            You can always edit this later if you need.
          </p>
          <input
            value={name}
            type="text"
            placeholder="Cult Name"
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && <p className="error">{validationErrors.name}</p>}
        </section>
        <section>
          <h3>Now describe what your cult is about.</h3>
          <p>
            People will see this when we promote your cult, but you'll be able to add to it later, too.
            Here are some recommended topics to cover that will help people visiting your cult's page.
          </p>
          <ol>
            <li>Who/What do you serve?</li>
            <li>Who should join - preferred blood-type, zodiac sign, greatest fears, etc?</li>
            <li>What are some of your standard ritual practices?</li>
            <li>What is the expected value and frequency of voluntary donations?</li>
            <li>What are the consequences of attempting to abandon your cult?</li>
          </ol>
          <textarea
            value={about}
            placeholder="About us..."
            rows="6"
            cols="40"
            onChange={(e) => setAbout(e.target.value)}
          />
          {validationErrors.about && <p className="error">{validationErrors.about}</p>}
        </section>
        <section>
          <h3>Final steps...</h3>
          <p>Is this an online or in-person cult?</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
          {validationErrors.type && <p className="error">{validationErrors.type}</p>}
          <p>Is this cult public or private?</p>
          <select
            value={isPrivate}
            onChange={(e) => setIsPrivate(e.target.value)}
          >
            <option value={false}>Public</option>
            <option value={true}>Private</option>
          </select>
          {validationErrors.private && <p className="error">{validationErrors.private}</p>}
          <p>Please add an image url for your group</p>
          <input
            value={url}
            type="text"
            placeholder="image url"
            onChange={(e) => setUrl(e.target.value)}
          />
          {validationErrors.url && <p className="error">{validationErrors.url}</p>}
        </section>
        <section>
          <button type="submit">
            Create Cult
          </button>
        </section>
      </form>
    </div>
  )
}

export default CreateGroupForm;