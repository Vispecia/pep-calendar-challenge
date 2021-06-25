export const iState = {
  month: "JUN",
  filter: "month",
};

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  if (action.type === "UPDATE_MONTH") {
    return {
      ...state,
      month: action.payload.month,
    };
  }
  if (action.type === "UPDATE_FILTER") {
    return {
      ...state,
      filter: action.payload.filter,
    };
  }
  return state;
};
