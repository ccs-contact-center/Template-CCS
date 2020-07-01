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
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
// eslint-disable-next-line
//import navigation from "../../_nav";
// routes config
//import routes from "../../routes";
import { allowedRoutes } from "../../Services/routeHandler";
import AuthService from "../../Services/AuthService";
import { store as notiStore } from "react-notifications-component";
import { ws } from "../../Services/Socket";
import { General } from "../../Services/API_CCS";
import { connect } from "react-redux";
import {
  fetchDeleteUser,
  fetchSetUser,
} from "../../Redux/Reducers/userReducer";
import { setUI, deleteUI } from "../../Redux/Reducers/uiReducer";

import withAuth from "../../Services/withAuth";

const Auth = new AuthService();
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const API = new General();

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
  state = {
    routes: [],
    menu: { items: [] },
  };

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
    this.props.deleteUI();
    this.props.history.replace("/Login");
  }

  profile(e) {
    this.props.history.replace("/Profile");
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

    var validation =
      JSON.stringify(this.props.ui.ui) === JSON.stringify({ items: [] });

    if (validation === true) {
      API.getNavigationMenu(this.props.user.user[0].role)
        .then((res) => {
          this.props.setUI(res);
        })
        .then(() => {
          this.setState({ routes: allowedRoutes(this.props.ui.ui) });
        })
        .catch((ex) => {
          console.log(
            "Hay un error para construir el sistema de navegación (" + ex + ")"
          );
        });
    } else {
      this.setState({ routes: allowedRoutes(this.props.ui.ui) });
    }
  }

  render() {
    const {
      fetchSetUser,
      fetchDeleteUser,
      setUI,
      deleteUI,
      ...rest
    } = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={(e) => this.signOut(e)}
              myProfile={(e) => this.profile(e)}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={/*navigation  this.state.menu*/ this.props.ui.ui}
                {...rest}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/*<AppBreadcrumb appRoutes={this.state.routes} router={router} />*/}
            <div style={{ marginTop: "4vh" }} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.state.routes.map((route, idx) => {
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
    ui: state.ui,
  }),

  {
    fetchSetUser,
    fetchDeleteUser,
    setUI,
    deleteUI,
  }
)(withAuth(DefaultLayout));
