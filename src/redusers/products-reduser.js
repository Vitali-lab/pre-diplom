import { ACTION_TYPE } from "../actions/type";

const initialAppState = {
  products: [],
  categories: [],
  seasons: [],
};

export const productsReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case ACTION_TYPE.ADD_PRODUCT: {
      return { ...state, products: [...state.products, action.payload] };
    }
    case ACTION_TYPE.REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }
    case ACTION_TYPE.SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case ACTION_TYPE.ADD_CATEGORY: {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case ACTION_TYPE.REMOVE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id
        ),
      };
    }

    case ACTION_TYPE.SET_SEASONS: {
      return { ...state, seasons: action.payload };
    }
    case ACTION_TYPE.ADD_SEASON: {
      return { ...state, seasons: [...state.seasons, action.payload] };
    }
    case ACTION_TYPE.REMOVE_SEASON: {
      return {
        ...state,
        seasons: state.seasons.filter(
          (season) => season.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
