import { removeProduct } from "../../actions/remove-product";
export const deleteProduct = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await response.json();

  dispatch(removeProduct(product));
};
