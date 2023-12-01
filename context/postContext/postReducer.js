import * as ACTION from "./Types";

const postReducer = (state, action) => {
  switch (action.type) {
    case ACTION.GET_USERS_POSTS_REQUEST:
      return {
        ...state,
        userPosts: {
          ...state.userPosts,
          isLoading: true,
        },
      };
    case ACTION.GET_USERS_POSTS:
      return {
        ...state,
        userPosts: {
          posts: action.payload,
          isLoading: false,
        },
      };
    case ACTION.GET_TYPES:
      return {
        ...state,
        postType: action.payload,
      };
    case ACTION.GET_SINGLE_CITY:
      return {
        ...state,
        singleCity: action.payload,
      };
    case ACTION.GET_LOCATION:
      return {
        ...state,
        location: action.payload,
      }; //could change
    // case ACTION.GET_LOCATION:
    //   return {
    //     ...state,
    //     location: {
    //       country: action.payload.country,
    //       state: action.payload.state,
    //       cities: action.payload.cities,
    //     },
    //   };
    case ACTION.GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      }; //could change
    case ACTION.GET_POST_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case ACTION.GET_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

// change some issues

export default postReducer;
