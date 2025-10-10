import { addCategory } from "../../actions/add-category";

export const postCategory = (name) => async (dispatch) => {
  const response = await fetch("http://localhost:4000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const сategory = await response.json();
  dispatch(addCategory(сategory));
};
