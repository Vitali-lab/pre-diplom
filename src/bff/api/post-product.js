import { addProduct } from "../../actions/add-product";

export const postProduct =
  (name, description, price, image, category, season, sizes) =>
  async (dispatch) => {
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: category,
        images: image,
        name,
        description,
        price,
        sizes,
        rating: 0,
        likes: 0,
        season_id: season,
      }),
    });
    const products = await response.json();
    dispatch(addProduct(products));
  };
