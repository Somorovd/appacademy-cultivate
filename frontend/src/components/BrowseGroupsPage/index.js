import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GroupCard from "../GroupCard";
import * as groupActions from "../../store/groups";
import BrowsingNavigation from "../BrowsingNavigation";

const BrowseGroupsPage = () => {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state.groups.allGroups);

  useEffect(() => {
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch])

  return (
    <>
      <BrowsingNavigation />
      <h2>Groups In {"<site here>"}</h2>
      <div className="group-card-list">
        {allGroups && allGroups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </>
  )
}

export default BrowseGroupsPage;