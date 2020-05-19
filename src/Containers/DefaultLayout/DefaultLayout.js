import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import AuthService from "../../Services/AuthService";
import { store as notiStore } from "react-notifications-component";
import { ws } from "../../Services/Socket";

import { connect } from "react-redux";
import {
  fetchDeleteUser,
  fetchSetUser,
} from "../../Redux/Reducers/userReducer";

const Auth = new AuthService();
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

ws.addEventListener("open", (event) => {
  var user = Auth.getProfile();
  var d = new Date();
  ws.send(
    JSON.stringify({
      type: "browserRefresh",
      data: {
        username: user.id_ccs,
        date: d,
      },
    })
  );
});

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  doNothing() {}

  // eslint-disable-next-line
  t = setInterval(() => {
    Auth.loggedIn() ? this.doNothing() : this.signOut(this.e);
  }, 60000);

  signOut(e) {
    var user = Auth.getProfile();
    var d = new Date();
    var login = {
      type: "logout",
      data: {
        username: user.id_ccs,
        date: d,
      },
    };
    clearInterval(this.t);
    ws.send(JSON.stringify(login));
    Auth.logout();
    this.props.fetchDeleteUser();
    this.props.history.replace("/Login");
  }

  componentDidMount() {
    ws.onmessage = (event) => {
      var data = JSON.parse(event.data);

      switch (data.type) {
        case "selfLogin":
          notiStore.addNotification({
            title: "Nuevo Mensaje",
            message: data.data.body,
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          break;
        case "login":
          notiStore.addNotification({
            title: "Nuevo Mensaje",
            message: data.data.body,
            type: "info",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          break;
        case "forceLogout":
          this.signOut(this.e);
          break;

        default:
          break;
      }
    };
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/Inicio" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),

  {
    fetchSetUser,
    fetchDeleteUser,
  }
)(DefaultLayout);
