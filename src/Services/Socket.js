import socketIOClient from "socket.io-client";

const URL = "https://socket.ccscontactcenter.com";
//const URL = "http://localhost:8082";

export var socket = socketIOClient(URL, {
  transports: ["websocket"],
});

