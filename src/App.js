import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./Containers/DefaultLayout"));
const Login = React.lazy(() => import("./Views/Login"));



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/Login"
              name="Login Page"
              render={(props) => <Login {...props} />}
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
