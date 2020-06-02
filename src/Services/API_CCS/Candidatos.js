import AuthService from "../AuthService";
import moment from "moment";
import "moment/locale/es";
import { hostURL } from "../../config";

export default class API_CCS {
  constructor() {
    this.Auth = new AuthService();
    this.fetch = this.fetch.bind(this);
  }

  async fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (await this.Auth.loggedIn()) {
      headers["Authorization"] = "Bearer " + (await this.Auth.getToken());
    } else {
      window.location.href = "/login";
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  async fetchAnonimo(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  sendMail(data) {
    return this.fetchAnonimo(
      "https://api.ccscontactcenter.com/v1/interface/send-email",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  insertCandidato(state) {
    return this.fetchAnonimo(hostURL + "/v1/personal/candidatos", {
      method: "POST",
      body: JSON.stringify(state),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  validaCandidato(state) {
    var fecha = moment.utc(state.fecha_nacimiento).format("DD/MM/YYYY");
    return this.fetchAnonimo(
      hostURL +
        "/v1/personal/candidatoValidacion?nombres=" +
        state.nombres +
        "&paterno=" +
        state.paterno +
        "&materno=" +
        state.materno +
        "&fecha=" +
        fecha,
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatos() {
    return this.fetch(hostURL + "/v1/personal/candidatos", {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatosConfirmar() {
    return this.fetchAnonimo(hostURL + "/v1/personal/candidatosConfirmar", {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidatosAuditoria() {
    return this.fetchAnonimo(hostURL + "/v1/personal/candidatosAuditoria", {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }
  getCartera() {
    return this.fetchAnonimo(hostURL + "/v1/personal/cartera", {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }
  getCandidatosRP() {
    return this.fetchAnonimo(hostURL + "/v1/personal/candidatosRolePlay", {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCandidato(id) {
    return this.fetchAnonimo(
      hostURL + "/v1/personal/candidato/" + id,

      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  updateCandidato(data) {
    return this.fetchAnonimo(
      hostURL + "/v1/personal/candidato/" + data.selectedLead,

      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  updateCandidatoRolePlay(data) {
    return this.fetch(
      hostURL + "/v1/personal/candidatoRolePlay/" + data.selectedLead,

      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
  empleadosIntegracion(data) {
    return this.fetch(
      hostURL + "/v1/personal/EmpleadosIntegracion/",

      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
}
