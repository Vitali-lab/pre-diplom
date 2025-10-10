export const getProduct = (id) =>
  fetch(`http://localhost:4000/products/${id}`).then((res) => res.json());
