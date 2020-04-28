import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDeletePost } from "../../Redux/Reducers/postReducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditComponent from "./EditComponent";
import { Provider } from "react-redux";
import { store } from "../../Redux/Store";
const MySwal = withReactContent(Swal);

class Post extends Component {
  constructor() {
    super();
    this.handleSetEdit = this.handleSetEdit.bind(this);
  }
  handleSetEdit(event, post) {
    this.props.editPost(false, this.props.post.id);
    MySwal.fire({
      html: (
        <Provider store={store}>
          <EditComponent
            post={this.props.post}
            key={this.props.post.id}
            editPost={this.editPost}
          />
        </Provider>
      ),
      showConfirmButton: false,
      padding: "0em"
    }).then(result => {
      this.props.editPost(false, this.props.post.id);
    });
  }

  confirmDelete() {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "¡No podras deshacer esta acción!",
      type: "error",
      showCancelButton: true,
      confirmButtonColor: "#C00327",
      cancelButtonColor: "#B0AFB4",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.props.fetchDeletePost(this.props.post.id);
      }
    });
  }
  render() {
    return (
      <div className="post">
        <h2 className="post_title">{this.props.post.titulo}</h2>
        <p className="post_message">{this.props.post.contenido}</p>
        <div className="control-buttons">
          <button className="edit" onClick={() => this.handleSetEdit()}>
            Editar
          </button>
          <button className="delete" onClick={() => this.confirmDelete()}>
            Borrar
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.root
  }),
  {
    fetchDeletePost
  }
)(Post);
