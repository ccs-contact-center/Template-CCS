import React, { Component } from "react";

import { Card, CardBody, CardHeader } from "reactstrap";
import logo from "../Assets/img/brand/logo.png";
import withAuth from "../Services/withAuth";
import { Button, Spinner } from "react-bootstrap";
import { allowedRoutes } from "../Services/routeHandler";
import { General } from "../Services/API_CCS";
import { connect } from "react-redux";
import { setUI } from "../Redux/Reducers/uiReducer";
import { isLocalhost } from "../config";

const API = new General();

class Inicio extends Component {
  state = {
    loading: false,
    role: "",
  };
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  changeUI(role) {
    this.setState({ loading: true });
    API.getNavigationMenu(this.state.role)
      .then((res) => {
        this.props.setUI(res);
      })
      .then(() => {
        this.setState({ routes: allowedRoutes(this.props.ui.ui) });
        this.setState({ loading: false });
      })
      .catch((ex) => {
        this.setState({ loading: false });
        console.log(
          "Hay un error para construir el sistema de navegación (" + ex + ")"
        );
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader className="text-center">¡Bienvenido!</CardHeader>
          <CardBody className="text-center">
            <img src={logo} alt="Logo CCS" className="img-fluid" />
          </CardBody>
        </Card>

        {isLocalhost ? (
          <Card>
            <CardHeader className="text-center">Test UI</CardHeader>
            <CardBody className="text-center">
              <input
                type="number"
                value={this.state.role}
                onChange={this.handleChange}
                id="role"
              ></input>

              <Button
                color="primary"
                className="px-4"
                type="button"
                onClick={() => this.changeUI(this.state.role)}
              >
                {this.state.loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Cambiar"
                )}
              </Button>
            </CardBody>
          </Card>
        ) : null}
      </div>
    );
  }
}

//export default withAuth(Inicio);

export default connect(
  (state) => ({
    ui: state.ui,
  }),

  {
    setUI,
  }
)(withAuth(Inicio));
