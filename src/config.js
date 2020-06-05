//var ENV = "dev";

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
var WS, hostURL, wsEndpoints;

if (isLocalhost) {
  WS = "ws://localhost:8082";
  hostURL = "http://localhost:8082";
  wsEndpoints = "http://localhost:8082";
} else {
  WS = "wss://socket.ccscontactcenter.com";
  hostURL = "https://api.ccscontactcenter.com";
  wsEndpoints = "https://socket.ccscontactcenter.com";
}

export { WS, hostURL, wsEndpoints };
