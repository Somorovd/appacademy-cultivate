import { csrfFetch } from "./csrf";

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";

const actionGetAllGroups = (groups) => {
  return {
    type: GET_ALL_GROUPS,
    groups
  }
}

export const thunkGetAllGroups = () => async dispatch => {
  const response = await fetch("/api/groups");
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetAllGroups(resBody["Groups"]));
  return resBody;
}

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return { ...state, allGroups: action.groups };
    }
    default:
      return state;
  }
}

export default groupsReducer;