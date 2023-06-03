import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import { useEffect } from "react";

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
            {group.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default BrowseGroupsPage;