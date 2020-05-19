import AuthService from "./AuthService";
import { WS, hostURL } from "../config";

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
      window.location.href = "/Login";
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  getCampaignAvatar(id) {
    return this.fetch(hostURL + "/v1/Campaigns/Avatar?id=" + id, {
      method: "GET",
    }).then((res) => {
      return Promise.resolve(res);
    });
  }
  getOnlineStatus(id) {
    var response = fetch(hostURL + "/Socket/Clientes/" + id)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return response;
  }
  forceDisconnect(id) {
    var response = fetch(WS + "/Socket/Clientes/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return response;
  }
}
