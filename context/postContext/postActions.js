import { API_URL } from "@/config";
import * as ACTION from "./Types";
import axios from "axios";

export const getUserPosts = async (dispatch, token) => {
  try {
    dispatch({
      type: ACTION.GET_USERS_POSTS_REQUEST,
    });

    const url = `${API_URL}/get/data`;

    // const { data } = await axios.get(url, {
    //   headers: {
    //     user: user,
    //   },
    // });

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: ACTION.GET_USERS_POSTS,
      payload: data.data,
    });

    console.log("data", data);
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

export const resetState = (dispatch) => {
  dispatch({
    type: ACTION.RESET_STATE,
  });
};

export const createPost = (dispatch, data) => {};
