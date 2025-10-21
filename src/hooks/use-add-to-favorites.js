import { useDispatch } from "react-redux";
import { patchUserLikes } from "../bff/api/patch-user-likes";
import { notifySuccess, notifyError } from "../func/notification";
import { useSelector } from "react-redux";

export const useAddToFavorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const id = currentUser?.id;

  const addToFavorites = (post) => {
    if (currentUser) {
      if (currentUser.likes.find((item) => item.id === post.id))
        return notifyError(`${post.name} уже добавлен в избранное`);

      dispatch(patchUserLikes(id, post));
      notifySuccess(`${post.name} добавлен в избранное`);
    } else {
      notifyError(`Войдите в аккаунт чтобы добавить в избранное`);
    }
  };

  return { addToFavorites };
};
