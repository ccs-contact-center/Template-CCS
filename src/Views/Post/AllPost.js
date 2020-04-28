import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import '../../index.css'
import { fetchGetPosts } from "../../Redux/Reducers/postReducer";
import PostForm from "./PostForm";
import { Provider } from "react-redux";
import { store } from "../../Redux/Store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import socketIOClient from "socket.io-client";

import { store as notiStore } from "react-notifications-component";
const MySwal = withReactContent(Swal);
//const socket = socketIOClient("http://localhost:8082");
const socket = socketIOClient("https://api.ccscontactcenter.com", {
  transports: ["websocket"],
});

socket.on("connect", function () {
  console.log("connected!");
  socket.emit("greet", { message: "Hello Mr.Server!" });
});

class AllPost extends Component {
  state = {
    editing: false,
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.editPost = this.editPost.bind(this);
  }
  componentDidMount() {
    this.props.fetchGetPosts();

    socket.on("msgNotification", (data) => {
      notiStore.addNotification({
        title: "Nuevo Mensaje",
        message: data.body,
        type: data.type,
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    });
  }

  editPost(editing, index) {
    this.setState({
      editing: editing,
      index: index,
    });
  }

  handleNewPost() {
    MySwal.fire({
      html: (
        <Provider store={store}>
          <PostForm />
        </Provider>
      ),
      showConfirmButton: false,
      padding: "0em",
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  setUsername() {
    socket.emit("loginUser", {
      username: this.state.nombre,
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="post_heading">Todos los Posts</h1>

        {this.props.posts.posts.map((post) => (
          <div key={post.id}>
            {this.state.editing && post.id === this.state.index ? null : (
              <Post post={post} key={post.id} editPost={this.editPost} />
            )}
          </div>
        ))}
        <button onClick={() => this.handleNewPost()}>Nuevo Post</button>
        <br />
        <br />
 
      </div>
    );
  }
}

export default connect(
  (state) => ({
    posts: state.root,
  }),

  {
    fetchGetPosts,
  }
)(AllPost);
