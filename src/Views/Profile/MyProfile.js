import React, { Component } from "react";
import { Col, Row, FormGroup, Label, Input, Form, Container } from "reactstrap";
import { General, Candidatos } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";

class Llamada_General extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.General = new General();
    this.Candidatos = new Candidatos();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      nombres: "",
      paterno: "",
      materno: "",
      sexo: "",
      fecha_nacimiento: "",
      edo_civil: "",
      CURP: "",
      RFC: "",
      NSS: "",
      dependientes: "",
      escolaridad: "",
      tipo_vial: "",
      calle: "",
      exterior: "",
      interior: "",
      entrecalles: "",
      cp: "",
      colonia: "",
      colonias: [],
      municipio: "",
      municipios: [],
      estado: "",
      estadoNacimiento: "",
      tel_1: "",
      tel_2: "",
      email: "",
      claveEstado: "DF",
      activeTab: new Array(4).fill("1"),
      id_user: this.Auth.getProfile().id_ccs,
    };
  }

  titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
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
            id="formReclu"
          >
            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Nombres</Label>
                  <Input
                    type="text"
                    placeholder="Nombres"
                    readOnly
                    onChange={this.handleChange}
                    id="nombres"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Paterno</Label>
                  <Input
                    type="text"
                    placeholder="Apellido Paterno"
                    readOnly
                    onChange={this.handleChange}
                    id="paterno"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Materno</Label>
                  <Input
                    type="text"
                    placeholder="Apellido Materno"
                    readOnly
                    onChange={this.handleChange}
                    id="materno"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Sexo</Label>
                  <Input
                    type="text"
                    placeholder="Sexo"
                    readOnly
                    onChange={this.handleChange}
                    id="sexo"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Fecha de Nacimiento</Label>
                  <Input
                    type="text"
                    placeholder="Fecha de Nacimiento"
                    readOnly
                    onChange={this.handleChange}
                    id="fecha_nacimiento"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Estado Civil</Label>
                  <Input
                    type="text"
                    placeholder="Estado Civil"
                    readOnly
                    onChange={this.handleChange}
                    id="edo_civil"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">CURP</Label>
                  <Input
                    type="text"
                    placeholder="CURP"
                    readOnly
                    onChange={this.handleChange}
                    id="CURP"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">RFC</Label>
                  <Input
                    type="text"
                    placeholder="RFC"
                    readOnly
                    onChange={this.handleChange}
                    id="RFC"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">NSS</Label>
                  <Input
                    type="text"
                    placeholder="NSS"
                    readOnly
                    onChange={this.handleChange}
                    id="NSS"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Hijos</Label>
                  <Input
                    type="text"
                    placeholder="Hijos"
                    readOnly
                    onChange={this.handleChange}
                    id="dependientes"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Escolaridad</Label>
                  <Input
                    type="text"
                    placeholder="Escolaridad"
                    readOnly
                    onChange={this.handleChange}
                    id="escolaridad"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-2">
                <FormGroup>
                  <Label htmlFor="prospecto">Tipo Vial</Label>
                  <Input
                    type="text"
                    placeholder="Tipo Vial"
                    readOnly
                    onChange={this.handleChange}
                    id="tipo_vial"
                  />
                </FormGroup>
              </Col>

              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Calle</Label>
                  <Input
                    type="text"
                    placeholder="Calle"
                    readOnly
                    onChange={this.handleChange}
                    id="calle"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-1">
                <FormGroup>
                  <Label htmlFor="prospecto">Exterior</Label>
                  <Input
                    type="text"
                    placeholder="Ext."
                    readOnly
                    onChange={this.handleChange}
                    id="exterior"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-1">
                <FormGroup>
                  <Label htmlFor="prospecto">Interior</Label>
                  <Input
                    type="text"
                    placeholder="Int."
                    readOnly
                    onChange={this.handleChange}
                    id="interior"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-12">
                <FormGroup>
                  <Label htmlFor="prospecto">Entre Calles</Label>
                  <Input
                    type="text"
                    placeholder="Entrecalles"
                    readOnly
                    onChange={this.handleChange}
                    id="entrecalles"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-2">
                <FormGroup>
                  <Label htmlFor="prospecto">Código Postal</Label>
                  <Input
                    type="text"
                    placeholder="CP"
                    readOnly
                    onChange={this.handleChange}
                    id="cp"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-3">
                <FormGroup>
                  <Label htmlFor="prospecto">Colonia</Label>
                  <Input
                    type="text"
                    placeholder="Colonia"
                    readOnly
                    onChange={this.handleChange}
                    id="colonia"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-3">
                <FormGroup>
                  <Label htmlFor="prospecto">Delegación/Municipio</Label>
                  <Input
                    type="text"
                    placeholder="Municipio"
                    readOnly
                    onChange={this.handleChange}
                    id="municipio"
                  />
                </FormGroup>
              </Col>

              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Estado</Label>
                  <Input
                    type="text"
                    placeholder="Estado"
                    readOnly
                    onChange={this.handleChange}
                    id="estado"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Tel Celular</Label>
                  <Input
                    type="text"
                    placeholder="5555555555"
                    readOnly
                    onChange={this.handleChange}
                    id="tel_1"
                  />
                </FormGroup>
              </Col>

              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Tel Casa</Label>
                  <Input
                    type="text"
                    placeholder="5555555555"
                    readOnly
                    onChange={this.handleChange}
                    id="tel_2"
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Email</Label>
                  <Input
                    type="text"
                    placeholder="Email"
                    readOnly
                    onChange={this.handleChange}
                    id="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="prospecto">
                    Hobbies/Profesiones Secundarias
                  </Label>
                  <Input
                    type="text"
                    placeholder=""
                    readOnly
                    onChange={this.handleChange}
                    id="hobbies"
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

export default Llamada_General;
