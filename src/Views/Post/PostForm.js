import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAddPost } from "../../Redux/Reducers/postReducer";



class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      contenido: ""
    };
  }

  hanldeChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [`${name}`]: value });
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.fetchAddPost({
      titulo: this.state.titulo,
      contenido: this.state.contenido
    });
    this.setState({ titulo: "", contenido: "" });
  }

  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Create Post</h1>
        <form className="form" onSubmit={this.handleAdd.bind(this)}>
          <input
            required
            type="text"
            name="titulo"
            value={this.state.titulo}
            onChange={this.hanldeChange.bind(this)}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            name="contenido"
            value={this.state.contenido}
            onChange={this.hanldeChange.bind(this)}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Post</button>
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
    fetchAddPost
  }
)(PostForm);
