const initialAppState = {
    id: null,
    login : null,
    role_id: null
};

export const userReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return state;
    }
    default:
      return state;
  }
};
