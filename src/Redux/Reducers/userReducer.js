const initialState = {
  user: [],
};

const SET_USER = "SET_USER";
const DELETE_USER = "SET_USER";

const setUser = (user) => ({ type: SET_USER, payload: user });
const deleteUser = () => ({ type: DELETE_USER });

export const fetchSetUser = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  };
};
export const fetchDeleteUser = () => {
  return (dispatch) => {
    dispatch(deleteUser());
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
};
