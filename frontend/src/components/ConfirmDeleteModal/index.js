import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ what, type, path }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  let deleteThunk;
  switch (type) {
    case "group":
      deleteThunk = groupActions.thunkDeleteGroup;
      break;
    case "event":
      deleteThunk = eventActions.thunkDeleteEvent;
      break;
    default: break;
  }

  const onClickDelete = () => {
    dispatch(deleteThunk(what.id));
    closeModal();
    history.push(path);
  }

  return (
    <div className="confirm-delete-modal">
      <h2>Are you sure you want to delete&nbsp;
        <span className="deleted-name">
          {what.name}
        </span>
        ?</h2>
      <button
        className="confirm-delete-button"
        onClick={onClickDelete}
      >
        Confirm delete
      </button>
      <button
        className="cancel-delete-button"
        onClick={closeModal}
      >
        <span>
          Cancel
        </span>
      </button>
    </div>
  )
}

export default ConfirmDeleteModal