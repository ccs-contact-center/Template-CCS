import { fetchCCS } from "./index";
import moment from "moment";
import "moment/locale/es";
import { hostURL } from "../../config";

export default class Candidatos {
  getCandidatos(arrayStatus) {
    return fetchCCS(
      hostURL + "/v2/Personal/Candidatos?status=" + JSON.stringify(arrayStatus),
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

  insertCandidato(state) {
    return fetchCCS(
      hostURL + "/v2/personal/candidato",
      {
        method: "POST",
        body: JSON.stringify(state),
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
