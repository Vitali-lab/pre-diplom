import { ACTION_TYPE } from "./type";
export const removeCategory = (category) => ({
  type: ACTION_TYPE.REMOVE_CATEGORY,
  payload: category,
});
