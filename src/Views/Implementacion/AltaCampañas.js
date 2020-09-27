import React, { Component } from "react";
import { Col, Row, FormGroup, Label, Input, Form, Container } from "reactstrap";
import { General, Candidatos } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";
import { connect } from "react-redux";

class Llamada_General extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  state = {
    nombre: "",
    estaciones: "",
    agentes: "",
    centro: "",
    modo_operativo: "",
    integracion: "",
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.General = new General();
    this.Candidatos = new Candidatos();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
  }

  titleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  NumText(string) {
    //solo letras y numeros
    var out = "";
    //Se añaden las letras validas
    var filtro =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 "; //Caracteres validos

    for (var i = 0; i < string.length; i++)
      if (filtro.indexOf(string.charAt(i)) !== -1) out += string.charAt(i);
    return out;
  }
  handleChange(e) {
    this.setState({
      [e.target.id]: this.NumText(e.target.value.toUpperCase()),
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Form
            className="form-horizontal"
            onSubmit={this.handleFormSubmit}
            innerRef={this.formRef}
            autoComplete="off"
          >
            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Nombre</Label>
                  <Input
                    type="text"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                    id="nombre"
                    required
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Estaciones</Label>
                  <Input
                    type="number"
                    value={this.state.estaciones}
                    onChange={this.handleChange}
                    id="estaciones"
                    required
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Agentes</Label>
                  <Input
                    type="number"
                    value={this.state.agentes}
                    onChange={this.handleChange}
                    id="agentes"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Centro</Label>
                  <Input
                    type="text"
                    value={this.state.centro}
                    onChange={this.handleChange}
                    id="centro"
                    required
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Modo Operativo</Label>
                  <Input
                    type="text"
                    value={this.state.modo_operativo}
                    onChange={this.handleChange}
                    id="modo_operativo"
                    required
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Integración</Label>
                  <Input
                    type="text"
                    value={this.state.integracion}
                    onChange={this.handleChange}  
                    id="integracion"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect((state) => ({
  user: state.user,
  ui: state.ui,
}))(Llamada_General);
