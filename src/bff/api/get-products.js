export const getProducts = () =>
  fetch("http://localhost:4000/products").then((res) => res.json());
