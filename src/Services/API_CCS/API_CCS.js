import AuthService from "../AuthService";
import { hostURL } from "../../config";

class API_CCS {
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
}

export default API_CCS;
