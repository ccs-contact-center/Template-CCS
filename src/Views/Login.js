import React, { Component } from "react";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import md5 from "md5";
import AuthService from "../Services/AuthService";
import API_CCS from "../Services/API_CCS";
import splash from "../Assets/img/brand/splash.png";
import { ws } from "../Services/Socket";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//ws.addEventListener("open", function (event) {});

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.requestAvatar = this.requestAvatar.bind(this);
    this.Auth = new AuthService();
    this.API_CCS = new API_CCS();
    this.state = {
      username: "",
      password: "",
    };
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    var online = await this.API_CCS.getOnlineStatus(this.state.username);

    var user = await this.Auth.login(
      this.state.username,
      md5(this.state.password)
    );

    if (user.sucess === false && online.logged === false) {
      MySwal.fire({
        title: "Error al Iniciar Sesión",
        text: "Usuario o contraseña invalidos, por favor intenta de nuevo",
        type: "error",
        confirmButtonColor: "#C00327",
        allowOutsideClick: true,
      });

      this.setState({ username: "", password: "" });
      console.log("Contraseña incorrecta");
    } else if (user.sucess === true && online.logged === true) {
      MySwal.fire({
        title: "Tienes otra sesión activa!",
        text: "¿Deseas cerrar las otras sesiones e ingresar aqui?",
        type: "error",
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: "#C00327",
        cancelButtonColor: "#C00327",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          this.API_CCS.forceDisconnect(this.state.username).then((res) => {
            this.setUsername();
            console.log(res);
            this.setState({ campaign: user.recordset[0].campania });
            this.props.history.replace("/Inicio");
          });
        } else {
          this.setState({ username: "", password: "" });
        }
      });
    } else if (user.sucess === true && online.logged === false) {
      this.setUsername();

      this.setState({ campaign: user.recordset[0].campania });
      this.props.history.replace("/Inicio");
    } else {
      console.log(user.sucess, online.logged);
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  componentDidlMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/Inicio");
  }

  requestAvatar = async () => {
    const response = await this.API_CCS.getCampaignAvatar(this.state.campaign);
    return response;
  };

  setUsername() {
    var d = new Date();
    var login = {
      type: "login",
      data: {
        username: this.state.username,
        date: d,
      },
    };
    ws.send(JSON.stringify(login));
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleFormSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Ingresa a tu Cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          id="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          id="password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            disabled={!this.validateForm()}
                            type="submit"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white d-md-down-none"
                  style={{ width: "100%" }}
                >
                  <img src={splash} alt="Logo CCS" style={{ width: "100%" }} />
                  <div
                    style={{
                      color: "white",
                      position: "absolute",
                      paddingTop: "20px",
                      paddingLeft: "55px",
                      top: "120px",
                      width: "150px",
                      height: "85px",
                      textShadow: "1px 1px 5px #000000",
                    }}
                  >
                    <h4>SIG</h4>
                  </div>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
