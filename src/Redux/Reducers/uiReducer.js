const initialState = {
  ui: { items: [] },
};

const SET_UI = "SET_UI";

const setUIAction = (ui) => ({ type: SET_UI, payload: ui });

export const setUI = (ui) => {
  return (dispatch) => {
    dispatch(setUIAction(ui));
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI:
      return {
        ...state,
        ui: action.payload,
      };

    default:
      return state;
  }
};
