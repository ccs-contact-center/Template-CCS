import { fetchCCS } from "./index";
import { hostURL, wsEndpoints } from "../../config";

export default class API_CCS {
  sendMail(data) {
    return fetchCCS(
      "https://api.ccscontactcenter.com/v1/interface/send-email",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getNavigationMenu(roleID) {
    return fetchCCS(
      hostURL + "/v1/catalogs/menu?role=" + roleID,
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  forceDisconnect(id) {
    return fetchCCS(
      wsEndpoints + "/Socket/Clientes/" + id,
      {
        method: "DELETE",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getColonias(Estado, Municipio) {
    return fetchCCS(
      hostURL +
        "/v1/catalogs/colonias?estado=" +
        Estado +
        "&municipio=" +
        Municipio,
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getMunicipios(Estado) {
    return fetchCCS(
      hostURL + "/v1/catalogs/municipios?estado=" + Estado,
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCP(CP) {
    return fetchCCS(
      hostURL + "/v1/catalogs/codigo_postal/" + CP,
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getClaveEstado(Estado) {
    return fetchCCS(
      hostURL + "/v1/catalogs/clavesEstados/" + Estado,
      {
        method: "GET",
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCampanias() {
    return fetchCCS(
      hostURL + "/v1/campaigns/campanias",
      { method: "GET" },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  getCampaignAvatar(id) {
    return fetchCCS(
      hostURL + "/v1/Campaigns/Avatar?id=" + id,
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
}
