import { removeCategory } from "../../actions/remove-category";
export const deleteCategory = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:4000/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const category = await response.json();

  dispatch(removeCategory(category));
};
