import { CITY } from "./actionTypes";

const init = {
  cityname: "pune",
};

export const regFav = (state = init, { type, payload }) => {
  switch (type) {
    case CITY:
      return {
        data: payload,
      };
    default:
      return state;
  }
};
