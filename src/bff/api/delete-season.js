import { removeSeason } from "../../actions/remove-season";
export const deleteSeason = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:4000/seasons/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const season = await response.json();

  dispatch(removeSeason(season));
};
