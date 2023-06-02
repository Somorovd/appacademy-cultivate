import { csrfFetch } from "./csrf";

const CREATE_SESSION = "session/POST";
const GET_SESSION = "session/GET"
const DELETE_SESSION = "session/DELETE";

const actionCreateSession = (user) => {
  return {
    type: CREATE_SESSION,
    user,
  };
}

const actionGetSession = (user) => {
  return {
    type: GET_SESSION,
    user
  };
}

const actionDeleteSession = () => {
  return {
    type: DELETE_SESSION,
  };
}

export const thunkCreateSession = (user) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });
  const resBody = await response.json();

  if (response.ok) dispatch(actionCreateSession(resBody.user));
  return resBody;
}

export const thunkGetSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const resBody = await response.json();

  if (response.ok) dispatch(actionGetSession(resBody.user));
  return resBody;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION: {
      return { ...state, user: action.user }
    }
    case GET_SESSION: {
      return { ...state, user: action.user }
    }
    case DELETE_SESSION: {

    } break;
    default:
      return state
  }
}

export default sessionReducer;