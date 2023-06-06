import { csrfFetch } from "./csrf";

const GET_ALL_EVENTS = "events/GET_ALL_EVENTS";
const GET_ONE_EVENT = "events/GET_ONE_EVENT";

const actionGetAllEvents = (events) => {
  return {
    type: GET_ALL_EVENTS,
    events
  }
}

const actionGetOneEvent = (event) => {
  return {
    type: GET_ONE_EVENT,
    event
  }
}

export const thunkGetAllEvents = () => async dispatch => {
  const response = await fetch("/api/events");
  const resBody = await response.json();

  const events = {};
  resBody["Events"].forEach((event) => events[event.id] = event);

  if (response.ok) dispatch(actionGetAllEvents(resBody["Events"]));
  return resBody;
}

export const thunkGetOneEvent = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`);
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetOneEvent(resBody));
  return resBody;
}

export const thunkGetGroupEvents = (groupId) => async dispatch => {
  const response = await fetch(`/api/groups/${groupId}/events`);
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetAllEvents(resBody["Events"]));
  return resBody;
}

const initialState = { allEvents: {}, singleEvent: {} };

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS: {
      return { ...state, allEvents: action.events };
    }
    case GET_ONE_EVENT: {
      return { ...state, singleEvent: action.event };
    }
    default:
      return state;
  }
}

export default eventsReducer;