import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.scss";

const DefaultLayout = React.lazy(() => import("./Containers/DefaultLayout"));
const Login = React.lazy(() => import("./Views/Login"));

const Reclutamiento = React.lazy(() =>
  import("./Views/Reclutamiento/Reclutamiento")
);
const RHWizard = React.lazy(() => import("./Views/Reclutamiento/RHWizard"));
const BusquedaCandidatos = React.lazy(() =>
  import("./Views/Reclutamiento/BusquedaCandidatos")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={null}>
          <Switch>
            <Route
              exact
              path="/Login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/Reclutamiento"
              name="Reclutamiento"
              render={(props) => <Reclutamiento {...props} />}
            />
            <Route
              path="/RHWizard"
              name="RHWizard"
              render={(props) => <RHWizard {...props} />}
            />
            <Route
              path="/BusquedaCandidatos"
              name="Bussqueda Candidatos"
              render={(props) => <BusquedaCandidatos {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
