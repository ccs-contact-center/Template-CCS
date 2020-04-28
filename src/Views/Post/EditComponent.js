import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUpdatePost } from "../../Redux/Reducers/postReducer";

class EditComponent extends Component {
  handleEdit = e => {
    e.preventDefault();
    const titulo = this.getTitle.value;
    const contenido = this.getMessage.value;
    const data = {
      titulo,
      contenido
    };

    this.props.fetchUpdatePost(this.props.post.id, data);
  };
  render() {
    return (
      <div key={this.props.post.id} className="postModal">
        <form className="form" onSubmit={this.handleEdit}>
          <h2>Editando {this.props.post.titulo}</h2>
          <input
            required
            type="text"
            ref={input => (this.getTitle = input)}
            defaultValue={this.props.post.titulo}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={input => (this.getMessage = input)}
            defaultValue={this.props.post.contenido}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Actualizar</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.root
  }),

  {
    fetchUpdatePost
  }
)(EditComponent);
