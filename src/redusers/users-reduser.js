const initialAppState = {
  wasLoguot: false,
};

export const usersReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "SET_USERS": {
      return state;
    }

    default:
      return state;
  }
};
