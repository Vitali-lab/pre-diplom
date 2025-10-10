import { ACTION_TYPE } from "./type";
export const removeProduct = (product) => ({
  type: ACTION_TYPE.REMOVE_PRODUCT,
  payload: product,
});
