import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CreateGroupForm from "../Pages/CreateGroupForm";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import { useHistory } from "react-router-dom";

const EditGroupForm = () => {
  const { groupId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.singleGroup);
  const user = useSelector((state) => state.session.user);

  const isCurrentGroup = Number(group.id) === Number(groupId);
  const isAuthorized = user.id === group.organizerId;

  useEffect(() => {
    if (!isCurrentGroup) dispatch(groupActions.thunkGetOneGroup(groupId));
  }, [dispatch])

  if (!isAuthorized)
    history.push("/");

  return (
    <>
      {
        isAuthorized
          ? isCurrentGroup && <CreateGroupForm group={group} isEditting={true} />
          : <h2>Not Authorized</h2>
      }
    </>
  );
}

export default EditGroupForm;
