import { ACTION_TYPE } from "./type";

export const setProducts = (products) => ({
  type: ACTION_TYPE.SET_PRODUCTS,
  payload: products,
});
