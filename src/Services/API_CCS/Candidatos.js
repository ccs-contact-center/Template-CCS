import { fetchCCS } from "./index";
import moment from "moment";
import "moment/locale/es";
import { hostURL } from "../../config";

export default class API_CCS {
  insertCandidato(state) {
    return fetchCCS(
      hostURL + "/v2/personal/candidatos",
      {
        method: "POST",
        body: JSON.stringify(state),
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  validaCandidato(state) {
    var fecha = moment.utc(state.fecha_nacimiento).format("DD/MM/YYYY");
    return fetchCCS(
      hostURL +
        "/v2/personal/candidatoValidacion?nombres=" +
        state.nombres +
        "&paterno=" +
        state.paterno +
        "&materno=" +
        state.materno +
        "&fecha=" +
        fecha,
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatos() {
    return fetchCCS(
      hostURL + "/v2/personal/candidatos",
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatosConfirmar() {
    return fetchCCS(
      hostURL + "/v2/personal/candidatosConfirmar",
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatosAuditoria() {
    return fetchCCS(
      hostURL + "/v2/personal/candidatosAuditoria",
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
  getCartera() {
    return fetchCCS(
      hostURL + "/v2/personal/cartera",
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
  getCandidatosRP() {
    return fetchCCS(
      hostURL + "/v2/personal/candidatosRolePlay",
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidato(id) {
    return fetchCCS(
      hostURL + "/v2/personal/candidato/" + id,

      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  updateCandidato(data) {
    return fetchCCS(
      hostURL + "/v2/personal/candidato/" + data.selectedLead,

      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  updateCandidatoRolePlay(data) {
    return fetchCCS(
      hostURL + "/v2/personal/candidatoRolePlay/" + data.selectedLead,

      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
}
