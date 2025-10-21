import { ACTION_TYPE } from "../actions/type";
const initialAppState = {
  currentUser: null,
};

export const userReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, currentUser: action.payload };
    }
    case "LOGOUT": {
      return { ...state, currentUser: null };
    }
    case ACTION_TYPE.ADD_USER_LIKES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          likes: [...state.currentUser.likes, action.payload],
        },
      };
    }
    default:
      return state;
  }
};
