import React, { Component } from "react";
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

  t = setInterval(() => {
    !Auth.loggedIn() && this.signOut(this.e);
  }, 60000);

  signOut(e) {
    const { fetchDeleteUser, deleteUI, history } = this.props;
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
    fetchDeleteUser();
    deleteUI();
    history.replace("/Login");
  }

  profile(e) {
    const { history } = this.props;
    history.replace("/Profile");
  }

  componentDidMount() {
    const { ui, user, setUI } = this.props;

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

    var validation = JSON.stringify(ui.ui) === JSON.stringify({ items: [] });

    if (validation === true) {
      API.getNavigationMenu(user.user[0].role, user.user[0].su)
        .then((res) => {
          setUI(res);
        })
        .then(() => {
          this.setState({ routes: allowedRoutes(ui.ui) });
        })
        .catch((ex) => {
          console.log(
            "Hay un error para construir el sistema de navegación (" + ex + ")"
          );
        });
    } else {
      this.setState({ routes: allowedRoutes(ui.ui) });
    }
  }

  render() {
    const {
      fetchSetUser,
      fetchDeleteUser,
      setUI,
      deleteUI,
      ui,
      ...rest
    } = this.props;
    const { routes } = this.state;
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader
            onLogout={(e) => this.signOut(e)}
            myProfile={(e) => this.profile(e)}
          />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={ui.ui} {...rest} router={router} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <div style={{ marginTop: "4vh" }} />
            <Container fluid>
              <Switch>
                {routes.map(
                  (route, idx) =>
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    )
                )}
                <Redirect from="/" to="/Inicio" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
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
