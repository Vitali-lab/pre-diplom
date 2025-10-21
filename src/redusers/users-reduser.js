const initialAppState = {
  user: null,
};

export const usersReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "SET_USERS": {
      return { ...state, users: action.payload };
    }

    default:
      return state;
  }
};
