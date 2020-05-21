import AuthService from "../AuthService";

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

  getNavigationMenu(roleID) {
    return this.fetch(hostURL + "/v1/catalogs/menu?role=" + roleID, {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getColonias(Estado, Municipio) {
    return this.fetchAnonimo(
      hostURL +
        "/v1/catalogs/colonias?estado=" +
        Estado +
        "&municipio=" +
        Municipio,
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getMunicipios(Estado) {
    return this.fetchAnonimo(
      hostURL + "/v1/catalogs/municipios?estado=" + Estado,
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCP(CP) {
    return this.fetchAnonimo(hostURL + "/v1/catalogs/codigo_postal/" + CP, {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getClaveEstado(Estado) {
    return this.fetchAnonimo(hostURL + "/v1/catalogs/clavesEstados/" + Estado, {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCampanias() {
    return this.fetchAnonimo(
      hostURL + "/v1/campaigns/campanias",

      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCampaignAvatar(id) {
    return this.fetch(hostURL + "/v1/Campaigns/Avatar?id=" + id, {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }
}
