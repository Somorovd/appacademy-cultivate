import { csrfFetch } from "./csrf";

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";
const CREATE_GROUP = "groups/CREATE_GROUP";
const ADD_GROUP_IMAGE = "groups/ADD_GROUP_IMAGE";
const BULK_ADD_GROUP_IMAGES = "groups/BULK_ADD_GROUP_IMAGES";
const DELETE_GROUP = "groups/DELETE_GROUP";
const DELETE_GROUP_IMAGE = "groups/DELETE_GROUP_IMAGE";
const SET_PREVIEW_IMAGE = "groups/SET_PREVIEW_IMAGE";

const actionGetAllGroups = (groups) => {
  return {
    type: GET_ALL_GROUPS,
    groups,
  };
};

const actionGetOneGroup = (group) => {
  return {
    type: GET_ONE_GROUP,
    group,
  };
};

const actionCreateGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

const actionDeleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId,
  };
};

const actionAddGroupImage = (groupImage) => {
  return {
    type: ADD_GROUP_IMAGE,
    groupImage,
  };
};

const actionBulkAddGroupImages = (groupImages) => {
  return {
    type: BULK_ADD_GROUP_IMAGES,
    groupImages,
  };
};

const actionDeleteGroupImage = (groupImageId) => {
  return {
    type: DELETE_GROUP_IMAGE,
    groupImageId,
  };
};

const actionSetPreviewImage = (groupImageId) => {
  return {
    type: SET_PREVIEW_IMAGE,
    groupImageId,
  };
};

export const thunkGetAllGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  const resBody = await response.json();

  const groups = {};
  resBody["Groups"].forEach((group) => (groups[group.id] = group));

  if (response.ok) dispatch(actionGetAllGroups(groups));
  return resBody;
};

export const thunkGetOneGroup = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);
  const resBody = await response.json();
  if (response.ok) dispatch(actionGetOneGroup(resBody));
  return resBody;
};

export const thunkCreateGroup = (group) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(group),
  });
  const resBody = await response.json();
  if (response.ok) dispatch(actionCreateGroup(resBody));
  return resBody;
};

export const thunkUpdateGroup = (group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${group.id}`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(group),
  });
  const resBody = await response.json();
  if (response.ok) dispatch(actionCreateGroup(resBody));
  return resBody;
};

export const thunkDeleteGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "delete",
  });
  const resBody = await response.json();
  if (response.ok) dispatch(actionDeleteGroup(groupId));
  return resBody;
};

export const thunkAddGroupImage = (groupImage, groupId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("preview", groupImage.preview);
  formData.append("imageFiles", groupImage.imageFile);

  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "post",
    body: formData,
  });
  const resBody = await response.json();
  if (response.ok) dispatch(actionAddGroupImage(resBody["GroupImages"][0]));
  return resBody;
};

export const thunkBulkAddGroupImages =
  (groupImages, groupId) => async (dispatch) => {
    const formData = new FormData();
    Array.from(groupImages).forEach((image) =>
      formData.append("imageFiles", image)
    );

    const response = await csrfFetch(`/api/groups/${groupId}/images`, {
      method: "post",
      body: formData,
    });
    const resBody = await response.json();
    if (response.ok) dispatch(actionBulkAddGroupImages(resBody["GroupImages"]));
    return resBody;
  };

export const thunkDeleteGroupImage = (groupImage) => async (dispatch) => {
  const response = await csrfFetch(`/api/group-images/${groupImage.id}`, {
    method: "delete",
  });

  const resBody = await response.json();
  if (response.ok) dispatch(actionDeleteGroupImage(groupImage.id));
  return resBody;
};

export const thunkSetPreviewImage = (groupImageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/group-images/${groupImageId}`, {
    method: "put",
  });

  const resBody = await response.json();
  if (response.ok) dispatch(actionSetPreviewImage(groupImageId));
  return resBody;
};

const initialState = { allGroups: {}, singleGroup: {} };

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return { ...state, allGroups: action.groups };
    }
    case GET_ONE_GROUP: {
      return { ...state, singleGroup: action.group };
    }
    case CREATE_GROUP: {
      const allGroups = {
        ...state.allGroups,
        [action.group.id]: action.group,
      };
      const singleGroup = {
        ...action.group,
        Organizer: { id: action.group.organizerId },
        GroupImages: [],
      };
      return { ...state, allGroups, singleGroup };
    }
    case DELETE_GROUP: {
      const allGroups = { ...state.allGroups };
      delete allGroups[action.groupId];
      return { allGroups, singleGroup: {} };
    }
    case ADD_GROUP_IMAGE: {
      const singleGroup = {
        ...state.singleGroup,
        GroupImages: [action.groupImage],
      };
      return { ...state, singleGroup };
    }
    case BULK_ADD_GROUP_IMAGES: {
      const newState = { ...state };
      newState.singleGroup["GroupImages"] = [
        ...newState.singleGroup["GroupImages"],
        ...action.groupImages,
      ];
      return newState;
    }
    case DELETE_GROUP_IMAGE: {
      const singleGroup = {
        ...state.singleGroup,
      };
      singleGroup["GroupImages"] = singleGroup["GroupImages"].filter(
        (img) => img.id !== action.groupImageId
      );
      return { ...state, singleGroup };
    }
    case SET_PREVIEW_IMAGE: {
      const singleGroup = {
        ...state.singleGroup,
      };
      singleGroup["GroupImages"] = singleGroup["GroupImages"].map((img) => {
        if (img.id === action.groupImageId) img.preview = true;
        else if (img.preview) img.preview = false;
        return img;
      });
      return { ...state, singleGroup };
    }
    default:
      return state;
  }
};

export default groupsReducer;
