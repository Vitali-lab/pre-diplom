import { setProducts } from "../../actions/set-products";

export const getProducts = () => async (dispatch) => {
  const response = await fetch("http://localhost:4000/products");
  const products = await response.json();

  return dispatch(setProducts(products));
};
