import { ACTION_TYPE } from "./type";
export const addInCart = (product, id, size, count) => ({
  type: ACTION_TYPE.ADD_CARD,
  payload: { ...product, id, size, count },
});
