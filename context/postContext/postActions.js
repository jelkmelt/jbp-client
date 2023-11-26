import { API_URL } from "@/config";
import * as ACTION from "./Types";
import axios from "axios";

export const getUserPosts = async (dispatch, user) => {
  try {
    dispatch({
      type: ACTION.GET_USERS_POSTS_REQUEST,
    });

    const url = `${API_URL}/post/get/:userId`; //route will change, userId will be dynamic

    const { data } = await axios.get(url, {
      headers: {
        user: user,
      },
    });
    dispatch({
      type: ACTION.GET_USERS_POSTS,
      payload: data.posts,
    });
  } catch (error) {
    // comeback and handle error case
    console.log(error);
  }
};

export const getPostTypes = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_TYPES,
    payload: data,
  });
};

export const getSingleCity = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_SINGLE_CITY,
    payload: data,
  });
};

export const getLocation = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_LOCATION,
    payload: data,
  });
}; //could change

export const getCountry = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_COUNTRY,
    payload: data,
  });
}; //could change

export const getCategory = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_POST_CATEGORY,
    payload: data,
  });
};

export const getFormData = (dispatch, data) => {
  dispatch({
    type: ACTION.GET_FORM_DATA,
    payload: data,
  });
};

export const createPost = (dispatch, data) => {};
