import { addUserLikes } from "../../actions/add-user-likes";
export const patchUserLikes = (id, product) => async (dispatch) => {
  try {
    const user = await fetch(`http://localhost:4000/users/${id}`).then((res) =>
      res.json()
    );
    if (user.likes.find((like) => like.id === product.id)) return;

    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: [...user.likes, product],
      }),
    });
    const updatedUser = await response.json();
    console.log(updatedUser);

    dispatch(addUserLikes(product));
  } catch (e) {
    throw new Error(e.message);
  }
};
