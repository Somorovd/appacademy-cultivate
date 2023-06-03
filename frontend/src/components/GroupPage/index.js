import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as groupActions from "../../store/groups";

const GroupPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.singleGroup);

  useEffect(() => {
    dispatch(groupActions.thunkGetOneGroup(groupId));
  }, [dispatch]);

  return (
    group && <>
      <h2>Page for Group {group.name}</h2>
    </>
  );
}

export default GroupPage;