import decode from "jwt-decode";

const hostURL = "https://api.ccscontactcenter.com";
//const hostURL = 'http://localhost:3020'

export default class AuthService {
  constructor(domain) {
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return this.fetch(hostURL + "/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    sessionStorage.setItem("id_token", idToken);
  }

  getToken() {
    return sessionStorage.getItem("id_token");
  }

  logout() {
    sessionStorage.removeItem("id_token");
  }

  getProfile() {
    try {
      return decode(this.getToken());
    } catch (err) {
      console.log("No loggeado (AuthService:58) " + err);
      return false;
    }
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
