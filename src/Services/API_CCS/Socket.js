import { hostURL } from "../../config";

export default class Socket {
  getOnlineStatus(id) {
    var response = fetch(hostURL + "/Socket/Clientes/" + id)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return response;
  }
}
