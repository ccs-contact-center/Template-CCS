import AuthService from "../AuthService";

export { default as General } from "./General";
export { default as Candidatos } from "./Candidatos";
export { default as Usuarios } from "./Usuarios";
export { default as Socket } from "./Socket";
var Auth = new AuthService();

export const fetchCCS = async (url, options, auth) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (auth === 1) {
    if (await Auth.loggedIn()) {
      headers["Authorization"] = "Bearer " + (await Auth.getToken());
      headers["id_ccs"] = Auth.getProfile().id_ccs;
    } else {
      window.location.href = "/Login";
    }
  } else {
    headers["id_ccs"] = "Anonimo";
  }

  return fetch(url, {
    headers,
    ...options,
  })
    .then(Auth._checkStatus)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
