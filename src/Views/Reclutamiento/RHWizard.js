import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Wizard extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  componentDidMount() {
    MySwal.fire({
      title: "Bienvenido",
      allowOutsideClick: false,
      text: "¿Eres reingreso o aplicaste antes por un puesto en CCS despues de Diciembre de 2019?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#C00327",
      cancelButtonColor: "#C00327",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(result => {

      if (result.value) {
        this.props.history.replace("/BusquedaCandidatos");
      } else {
        this.props.history.replace("/Reclutamiento");
      }
    });
  }

  render() {
    return null;
  }
}

export default Wizard;
