import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GroupCard from "../GroupCard";
import * as groupActions from "../../store/groups";

const BrowseGroupsPage = () => {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state.groups.allGroups);

  useEffect(() => {
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch])

  return (
    <>
      <h2>Groups</h2>
      <ul>
        {allGroups && allGroups.map(group => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default BrowseGroupsPage;