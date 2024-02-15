import * as ACTION from './Types';
import { PER_CITY_COST } from '@/config';
import { defaultState } from './postState';

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
        cost: (state.postType !== 'free ad'
          ? action.payload.reduce(
              (acc, current) => acc + current.cities.length,
              0
            ) * PER_CITY_COST
          : 0
        ).toFixed(2),
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
    case ACTION.RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

// change some issues

export default postReducer;
