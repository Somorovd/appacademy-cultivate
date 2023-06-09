import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GroupCard from "../../GroupCard";
import * as groupActions from "../../../store/groups";
import BrowsingNavigation from "../../BrowsingNavigation";

const BrowseGroupsPage = () => {
  const dispatch = useDispatch();
  const allGroupsState = useSelector((state) => state.groups.allGroups);
  const allGroups = Object.values(allGroupsState);

  useEffect(() => {
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch])

  return (
    <>
      <div className="page-wrapper">
        <BrowsingNavigation />
        <h2 className="browsing-header">Cultivated Cults</h2>
        <div className="group-card-list">
          {allGroups && allGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BrowseGroupsPage;