import { csrfFetch } from "./csrf";

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";

const actionGetAllGroups = (groups) => {
  return {
    type: GET_ALL_GROUPS,
    groups
  }
}

const actionGetOneGroup = (group) => {
  return {
    type: GET_ONE_GROUP,
    group
  }
}

export const thunkGetAllGroups = () => async dispatch => {
  const response = await fetch("/api/groups");
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetAllGroups(resBody["Groups"]));
  return resBody;
}

export const thunkGetOneGroup = (groupId) => async dispatch => {
  const response = await fetch(`/api/groups/${groupId}`);
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetOneGroup(resBody));
  return resBody;
}

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return { ...state, allGroups: action.groups };
    }
    case GET_ONE_GROUP: {
      return { ...state, singleGroup: action.group };
    }
    default:
      return state;
  }
}

export default groupsReducer;