const initialState = {
  ui: { items: [] },
};

const SET_UI = "SET_UI";
const DELETE_UI = "DELETE_UI";

const setUIAction = (ui) => ({ type: SET_UI, payload: ui });
const deleteUIAction = () => ({ type: DELETE_UI });

export const setUI = (ui) => {
  return (dispatch) => {
    dispatch(setUIAction(ui));
  };
};


export const deleteUI = () => {
  return (dispatch) => {
    dispatch(deleteUIAction());
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI:
      return {
        ...state,
        ui: action.payload,
      };
    case DELETE_UI:
      return {
        ...state,
        ui: { items: [] },
      };

    default:
      return state;
  }
};
