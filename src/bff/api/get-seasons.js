import { setSeasons } from "../../actions/set-seasons";

export const getSeasons = () => async (dispatch) => {
  const response = await fetch("http://localhost:4000/seasons");
  const categories = await response.json();
  dispatch(setSeasons(categories));
};
