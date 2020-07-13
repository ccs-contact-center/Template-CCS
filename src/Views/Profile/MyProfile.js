import React, { Component } from "react";
import { Col, Row, FormGroup, Label, Input, Form, Container } from "reactstrap";
import { General, Candidatos } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";
import { connect } from "react-redux";

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
      nombres: this.props.user.user[0].nombres,
      paterno: this.props.user.user[0].paterno,
      materno: this.props.user.user[0].materno,
      sexo: this.props.user.user[0].sexo,
      fecha_nacimiento: this.props.user.user[0].fecha_nacimiento,
      edo_civil: this.props.user.user[0].edo_civil,
      CURP: this.props.user.user[0].CURP,
      RFC: this.props.user.user[0].RFC,
      NSS: this.props.user.user[0].NSS,
      dependientes: this.props.user.user[0].dep_economicos,
      escolaridad: this.props.user.user[0].escolaridad,
      tipo_vial: this.props.user.user[0].tipo_vial,
      calle: this.props.user.user[0].calle,
      exterior: this.props.user.user[0].ext,
      interior: this.props.user.user[0].int,
      entrecalles: this.props.user.user[0].entrecalles,
      cp: this.props.user.user[0].cp,
      colonia: this.props.user.user[0].colonia,
      colonias: [],
      municipio: this.props.user.user[0].municipio,
      municipios: [],
      estado: this.props.user.user[0].estado,
      estadoNacimiento: "",
      tel_1: this.props.user.user[0].tel_cel,
      tel_2: this.props.user.user[0].tel_casa,
      email: this.props.user.user[0].email,
      claveEstado: "DF",
      id_user: this.Auth.getProfile().id_ccs,
    };
  }

  titleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
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
                  <Input type="text" value={this.state.nombres} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Paterno</Label>
                  <Input type="text" value={this.state.paterno} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Materno</Label>
                  <Input type="text" value={this.state.materno} readOnly />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Sexo</Label>
                  <Input type="text" value={this.state.sexo} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Fecha de Nacimiento</Label>
                  <Input
                    type="text"
                    value={this.state.fecha_nacimiento}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Estado Civil</Label>
                  <Input type="text" value={this.state.edo_civil} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">CURP</Label>
                  <Input type="text" value={this.state.CURP} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">RFC</Label>
                  <Input type="text" value={this.state.RFC} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">NSS</Label>
                  <Input type="text" value={this.state.NSS} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Hijos</Label>
                  <Input
                    type="text"
                    value={this.state.dep_economicos}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Escolaridad</Label>
                  <Input type="text" value={this.state.escolaridad} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="col-sm-2">
                <FormGroup>
                  <Label htmlFor="prospecto">Tipo Vial</Label>
                  <Input type="text" value={this.state.tipo_vial} readOnly />
                </FormGroup>
              </Col>

              <Col className="col-sm-6">
                <FormGroup>
                  <Label htmlFor="prospecto">Calle</Label>
                  <Input type="text" value={this.state.calle} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-1">
                <FormGroup>
                  <Label htmlFor="prospecto">Exterior</Label>
                  <Input type="text" value={this.state.exterior} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-1">
                <FormGroup>
                  <Label htmlFor="prospecto">Interior</Label>
                  <Input type="text" value={this.state.interior} readOnly />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-12">
                <FormGroup>
                  <Label htmlFor="prospecto">Entre Calles</Label>
                  <Input type="text" value={this.state.entrecalles} readOnly />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-2">
                <FormGroup>
                  <Label htmlFor="prospecto">Código Postal</Label>
                  <Input type="text" value={this.state.cp} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-3">
                <FormGroup>
                  <Label htmlFor="prospecto">Colonia</Label>
                  <Input type="text" value={this.state.colonia} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-3">
                <FormGroup>
                  <Label htmlFor="prospecto">Delegación/Municipio</Label>
                  <Input type="text" value={this.state.municipio} readOnly />
                </FormGroup>
              </Col>

              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Estado</Label>
                  <Input type="text" value={this.state.estado} readOnly />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Tel Celular</Label>
                  <Input type="text" value={this.state.tel_1} readOnly />
                </FormGroup>
              </Col>

              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Tel Casa</Label>
                  <Input type="text" value={this.state.tel_2} readOnly />
                </FormGroup>
              </Col>
              <Col className="col-sm-4">
                <FormGroup>
                  <Label htmlFor="prospecto">Email</Label>
                  <Input type="text" value={this.state.materno} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="prospecto">
                    Hobbies/Profesiones Secundarias
                  </Label>
                  <Input type="text" value={this.state.hobbies} readOnly />
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
