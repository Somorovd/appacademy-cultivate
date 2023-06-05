import { csrfFetch } from "./csrf";

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";
const CREATE_GROUP = "groups/CREATE_GROUP";

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

const actionCreateGroup = (group) => {
  return {
    type: CREATE_GROUP,
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

export const thunkCreateGroup = (group) => async dispatch => {
  const response = await csrfFetch("/api/groups", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(group)
  });
  const resBody = await response.json();
  if (response.ok) dispatch(actionCreateGroup(resBody));
  return resBody;
}

const groupsReducer = (state = {}, action) => {
  console.log("REDUCER:", state);
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return { ...state, allGroups: action.groups };
    }
    case GET_ONE_GROUP: {
      return { ...state, singleGroup: action.group };
    }
    case CREATE_GROUP: {
      return { ...state };    
    }
    default:
      return state;
  }
}

export default groupsReducer;