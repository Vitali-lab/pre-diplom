export const postOrders = (order) =>
  fetch("http://localhost:4000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
