import { fetchCCS } from "./index";
import { hostURL } from "../../config";

export default class Usuarios {
  getUsuarios(arrayStatus) {
    return fetchCCS(
      hostURL + "/v2/Personal/Usuarios?status=" + JSON.stringify(arrayStatus),
      {
        method: "GET",
      },
      1
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
  insertUsuario(state) {
    return fetchCCS(
      hostURL + "/v2/Personal/Usuario",
      {
        method: "POST",
        body: JSON.stringify(state),
      },
      0
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
}
