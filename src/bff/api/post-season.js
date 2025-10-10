import { addSeason } from "../../actions/add-season";

export const postSeason = (name) => async (dispatch) => {
  const response = await fetch("http://localhost:4000/seasons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const season = await response.json();
  dispatch(addSeason(season));
};
