import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as groupActions from "../../store/groups";

const ConfirmDeleteModal = ({ groupId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const onClickDelete = () => {
    dispatch(groupActions.thunkDeleteGroup(groupId));
    closeModal();
    history.push("/groups");
  }

  return (
    <div>
      <h2>Are you sure you want to delete</h2>
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
        Cancel
      </button>
    </div>
  )
}

export default ConfirmDeleteModal