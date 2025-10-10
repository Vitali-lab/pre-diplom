const initialAppState = {
  wasLoguot: false,
};

export const appReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "LOGOUT": {
      return { ...state, wasLoguot: true };
    }

    default:
      return state;
  }
};
