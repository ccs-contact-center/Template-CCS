import {
  apiGetPosts,
  apiAddPost,
  apiUpdatePost,
  apiDeletePost,
} from "../../Services/API_POST";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialState = {
  posts: [],
};

const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POSTS";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

//actions
const getPosts = (posts) => ({ type: GET_POSTS, payload: posts });
const addPost = (post) => ({ type: ADD_POST, payload: post });
const updatePost = (post) => ({ type: UPDATE_POST, payload: post });
const deletePost = (id) => ({ type: DELETE_POST, payload: id });

export const fetchGetPosts = () => {
  return (dispatch) => {
    apiGetPosts()
      .then((res) => {
        dispatch(getPosts(res));
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const fetchAddPost = (post) => {
  return (dispatch) => {
    apiAddPost(post)
      .then((res) => {
        dispatch(addPost(res));
        return res;
      })
      .then((msg) => {
        MySwal.fire({
          title: "Correcto",
          text:
            '¡Se creo el post "' +
            msg[0].titulo +
            '", con ID ' +
            msg[0].id +
            "!",
          type: "success",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const fetchUpdatePost = (id, post) => {
  return (dispatch) => {
    apiUpdatePost(id, post)
      .then((res) => {
        dispatch(updatePost(res));
        return res;
      })
      .then((msg) => {
        MySwal.fire({
          title: "Correcto",
          text:
            '¡Se actualizo el post "' +
            msg[0].titulo +
            '", con ID ' +
            msg[0].id +
            "!",
          type: "success",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const fetchDeletePost = (id) => {
  return (dispatch) => {
    apiDeletePost(id)
      .then((res) => {
        dispatch(deletePost(id));
        return res;
      })
      .then((msg) => {
        MySwal.fire({
          title: "Correcto",
          text:
            '¡Se eliminó el post "' +
            msg[0].titulo +
            '", con ID ' +
            msg[0].id +
            "!",
          type: "success",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload[0]],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post.id === action.payload[0].id ? action.payload[0] : post
          ),
        ],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload)],
      };

    default:
      return state;
  }
};
