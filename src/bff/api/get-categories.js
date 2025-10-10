import { setCategories } from "../../actions/set-categories";

export const getCategories = () => async (dispatch) => {
  const response = await fetch("http://localhost:4000/categories");
  const categories = await response.json();
  dispatch(setCategories(categories));
};
