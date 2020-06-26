import { fetchCCS } from "./index";
import { hostURL } from "../../config";

export default class Usuarios {
  insertUsuario(state) {
    return fetchCCS(
      hostURL + "/v2/personal/usuario",
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
