import { removeUserLikes } from "../../actions/remove-user-likes";
export const deleteUserLikes = (id, product) => async (dispatch) => {
  const response = await fetch(`http://localhost:4000/users/${id}`);
  const currentUser = await response.json();

  await fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: currentUser.likes.filter((like) => like.id !== product.id),
    }),
  });

  dispatch(removeUserLikes(product));
};
