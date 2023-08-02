import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../../store/groups";
import "./CreateGroupForm.css";

const CreateGroupForm = ({ group, isEditting }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitButtonRef = useRef();

  const [city, setCity] = useState(group?.city || "");
  const [state, setState] = useState(group?.state || "");
  const [name, setName] = useState(group?.name || "");
  const [about, setAbout] = useState(group?.about || "");
  const [type, setType] = useState(group?.type || "");
  const [isPrivate, setIsPrivate] = useState(isEditting ? group.private : "");
  const image = group?.GroupImages?.find((img) => img.preview);
  const [url, setUrl] = useState(image?.url || "");
  const [imageFile, setImageFile] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const validateInput = () => {
    const errors = {};

    setCity(city.trim());
    setState(state.trim());
    setName(name.trim());
    setAbout(about.trim());
    setUrl(url.trim());

    if (!city) errors["city"] = "City is required";
    if (!state) errors["state"] = "State is required";
    if (!name) errors["name"] = "Name is required";
    if (!type) errors["type"] = "Type is required";
    if (!isEditting && !imageFile) errors["image"] = "Group image is required";
    if (
      isPrivate !== true &&
      isPrivate !== false &&
      isPrivate !== "true" &&
      isPrivate !== "false"
    ) {
      errors["private"] = "Privacy is required";
    }

    if (name && name.length > 60)
      errors["name"] = "Name cannot exceed 60 characters";
    if (!about || about.length < 30)
      errors["about"] = "About length must be at least 30 characters";
    if (about & (about.length > 1000))
      errors["about"] = "About cannot exceed 1000 characters";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    submitButtonRef.current.disabled = true;

    const groupData = {
      id: isEditting ? group.id : undefined,
      name,
      city,
      state,
      about,
      type,
      private: isPrivate,
    };
    const groupImage = {
      id: isEditting ? image?.id : undefined,
      preview: true,
      imageFile,
    };

    dispatch(
      isEditting
        ? groupActions.thunkUpdateGroup(groupData)
        : groupActions.thunkCreateGroup(groupData)
    )
      .then(async (group) => {
        if (!isEditting)
          await dispatch(groupActions.thunkAddGroupImage(groupImage, group.id));
        history.push(`/groups/${group.id}`);
      })
      .catch(async (res) => {
        const resBody = await res.json();
        setValidationErrors(resBody.errors || {});
        submitButtonRef.current.disabled = false;
      });
  };

  const returnToGroup = () => {
    history.push(`/groups/${group.id}`);
  };
  const returnToGroups = () => {
    history.push("/groups");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const header = isEditting ? (
    <>
      <h2>Update your Cult's Page</h2>
    </>
  ) : (
    <>
      <h3>Become a leader</h3>
      <h2>Form a new Cult</h2>
    </>
  );

  return (
    <div className="page-wrapper">
      <div className="return-nav">
        <button
          className="skew-left purple"
          onClick={isEditting ? returnToGroup : returnToGroups}
        >
          <span>Return to {isEditting ? "Cult" : "All Cults"}</span>
        </button>
      </div>
      <form
        className="create-group-form"
        onSubmit={onSubmit}
      >
        <section>{header}</section>
        <section>
          <h3>First, set your cult's location.</h3>
          <p>
            Cultivate cults meet locally, in person and online. We'll connect
            you with people in your area, and more will join you online.
          </p>
          <div className="location-inputs">
            <div>
              <input
                value={city}
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              {validationErrors.city && (
                <p className="error">{validationErrors.city}</p>
              )}
            </div>
            <div>
              <input
                value={state}
                type="text"
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
              />
              {validationErrors.state && (
                <p className="error">{validationErrors.state}</p>
              )}
            </div>
          </div>
        </section>
        <section>
          <h3>What is the name of your cult?</h3>
          <p>
            Choose a name that will give people a clear idea of what the cult is
            about and which entity you serve. You can always edit this later if
            you need.
          </p>
          <input
            value={name}
            type="text"
            placeholder="Cult Name"
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && (
            <p className="error">{validationErrors.name}</p>
          )}
        </section>
        <section>
          <h3>Now describe what your cult is about.</h3>
          <p>
            People will see this when we promote your cult, but you'll be able
            to add to it later, too. Here are some recommended topics to cover
            that will help people visiting your cult's page.
          </p>
          <ol>
            <li>Who/What do you serve?</li>
            <li>
              Who should join - preferred blood-type, zodiac sign, greatest
              fears, etc?
            </li>
            <li>What are some of your standard ritual practices?</li>
            <li>
              What is the expected value and frequency of voluntary donations?
            </li>
            <li>
              What are the consequences of attempting to abandon your cult?
            </li>
          </ol>
          <textarea
            value={about}
            placeholder="About us..."
            rows="6"
            cols="40"
            onChange={(e) => setAbout(e.target.value)}
          />
          {validationErrors.about && (
            <p className="error">{validationErrors.about}</p>
          )}
        </section>
        <section>
          <h3>Final steps...</h3>
          <p>Is this an online or in-person cult?</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option
              value={""}
              hidden
              disabled
            >
              (Select One)
            </option>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
          {validationErrors.type && (
            <p className="error">{validationErrors.type}</p>
          )}
          <p>Is this cult public or private?</p>
          <select
            value={isPrivate}
            onChange={(e) => setIsPrivate(e.target.value)}
          >
            <option
              value={""}
              hidden
              disabled
            >
              (Select One)
            </option>
            <option value={false}>Public</option>
            <option value={true}>Private</option>
          </select>
          {validationErrors.private && (
            <p className="error">{validationErrors.private}</p>
          )}
          {!isEditting && (
            <>
              <p>Please add an image url for your group</p>
              <input
                type="file"
                onChange={updateFile}
                accept=".jpg, .jpeg, .png"
              />
              {validationErrors.image && (
                <p className="error">{validationErrors.image}</p>
              )}
            </>
          )}
        </section>
        <section>
          <button
            type="submit"
            className="round blue"
            ref={submitButtonRef}
          >
            {(isEditting ? "Update" : "Create") + " Cult"}
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateGroupForm;
