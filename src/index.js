import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store"
import { PersistGate } from "redux-persist/lib/integration/react";

import ReactNotification from "react-notifications-component";
import "./theme.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactNotification />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

//Unregister para desactivar PWA
serviceWorker.register();
