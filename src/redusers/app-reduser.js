const initialAppState = {
  cart: [],
  order: [],
};

export const appReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "REMOVE_CARD": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case "UPDATE_CART_ITEM_COUNT": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        ),
      };
    }
    case "CREATE_ORDER": {
      return { ...state, order: action.payload };
    }

    default:
      return state;
  }
};
