import { useDispatch } from "react-redux";
import { deleteUserLikes } from "../bff/api/delete-user-likes";
import { patchUserLikes } from "../bff/api/patch-user-likes";
import { notifySuccess, notifyError } from "../func/notification";
import { useSelector } from "react-redux";

export const useToggleFavorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const id = currentUser?.id;

  const isUserLike = (post) => {
    if (!currentUser) {
      return false;
    }
    if (currentUser.likes.find((item) => item.id === post.id)) {
      return true;
    }
  };

  const toggleFavorites = (post) => {
    if (currentUser) {
      if (currentUser.likes.find((item) => item.id === post.id)) {
        dispatch(deleteUserLikes(id, post));
        notifySuccess(`${post.name} удален из избранного`);
      } else {
        dispatch(patchUserLikes(id, post));
        notifySuccess(`${post.name} добавлен в избранное`);
      }
    } else {
      notifyError(`Войдите в аккаунт чтобы добавить в избранное`);
    }
  };

  return { toggleFavorites, isUserLike };
};
