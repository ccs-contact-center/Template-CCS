import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class AsignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      contenido: "",
    };
  }

  hanldeChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [`${name}`]: value });
  }

  handleAdd(event) {
    event.preventDefault();
    MySwal.fire({
      title: "Correcto",
      text: "¡Se asigno el agente al curso!",
      type: "success",
      confirmButtonColor: "#C00327",
      allowOutsideClick: false,
    });
    this.setState({ titulo: "", contenido: "" });
  }

  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Asignar Grupo</h1>
        <form className="form" onSubmit={this.handleAdd.bind(this)}>
          <input
            required
            type="text"
            name="titulo"
            value={this.state.titulo}
            onChange={this.hanldeChange.bind(this)}
            placeholder="Nombre Grupo"
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
            placeholder="Instructor"
          />
          <br />
          <br />
          <button>Asignar</button>
        </form>
      </div>
    );
  }
}
export default AsignForm;
