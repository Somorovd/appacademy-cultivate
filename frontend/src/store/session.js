import { csrfFetch } from "./csrf";

const CREATE_SESSION = "session/POST_SESSION";
const GET_SESSION = "session/GET_SESSION"
const DELETE_SESSION = "session/DELETE_SESSION";
const CREATE_USER = "session/POST_USER";

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

const actionCreateUser = (user) => {
  return {
    type: CREATE_USER,
    user,
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
  const response = await fetch("/api/session");
  const resBody = await response.json();

  if (response.ok) dispatch(actionGetSession(resBody.user));
  return resBody;
}

export const thunkCreateUser = (user) => async dispatch => {
  console.log("Start of thunkCreateUser");
  const response = await csrfFetch("/api/users", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });
  console.log("Response", response);
  const resBody = await response.json();


  if (response.ok) dispatch(actionCreateSession(resBody.user));
  else console.log("Error: Could not create user");
  return resBody;
}

// REDUCER

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