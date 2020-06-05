import { wsEndpoints } from "../../config";

export default class Socket {
  getOnlineStatus(id) {
    var response = fetch(wsEndpoints + "/Socket/Clientes/" + id)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return response;
  }
}
