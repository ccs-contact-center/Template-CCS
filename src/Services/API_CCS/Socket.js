import { WS, hostURL } from "../../config";

export default class Socket {
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
