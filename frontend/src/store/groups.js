import { csrfFetch } from "./csrf";

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";
const CREATE_GROUP = "groups/CREATE_GROUP";
const ADD_GROUP_IMAGE = "groups/ADD_GROUP_IMAGE";

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

const actionAddGroupImage = (groupImage, groupId) => {
  return {
    type: ADD_GROUP_IMAGE,
    groupImage,
    groupId
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

export const thunkCreateGroup = (group, groupImage) => async dispatch => {
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

export const thunkAddGroupImage = (groupImage, groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(groupImage)
  });
  const resBody = await response.json();
  if (response.ok) {
    dispatch(actionAddGroupImage(groupImage, groupId));
    dispatch(thunkGetOneGroup(groupId));
  }
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
    case CREATE_GROUP: {
      const groups = { ...state };
      if (!groups.allGroups)
        groups.allGroups = [action.group]
      else groups.allGroups.push(action.group);
      return groups;
    }
    case ADD_GROUP_IMAGE: {
      return { ...state.allGroups };
    }
    default:
      return state;
  }
}

export default groupsReducer;