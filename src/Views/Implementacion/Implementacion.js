import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";

const brandColor = "#fc4669";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #e4e7ea",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(192, 3, 39, 0.25)" : 0,
    borderColor: state.isFocused ? brandColor : base.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? brandColor : base.borderColor,
    },
    "&:active": {
      borderColor: state.isFocused ? brandColor : base.borderColor,
    },
  }),
};

const dummyData = [{ value: "Dumme Data", label: "Dummy Data" }];

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "rgba(192,3,39,.2)",
    primary50: "rgba(192,3,39,.2)",
    primary75: "rgba(192,3,39,.2)",
    primary: "rgba(192,3,39,.8)",
  },
});

class Implementacion extends Component {
  state = {
    isSaving: false,
    accordion: [true, false, false, false, false, false, false],
    estadoNacimiento: "",
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }
  handleChangeEstadoNacimiento = (e) => {
    try {
      this.setState({ estadoNacimiento: e.label });
    } catch (err) {
      this.setState({ claveEstado: "", estadoNacimiento: "" });
    }
  };

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Form
          className="form-horizontal"
          onSubmit={this.handleFormSubmit}
          innerRef={this.formRef}
          autoComplete="off"
          id="formReclu"
        >
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(0)}
              style={{ textAlign: "center" }}
            >
              General
            </CardHeader>
            <Collapse isOpen={this.state.accordion[0]}>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Nombre Comercial</Label>
                      <Input
                        type="text"
                        placeholder="Nombre Comercial"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Razón Social</Label>
                      <Input
                        type="text"
                        placeholder="Razón Social"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">RFC</Label>
                      <Input
                        type="text"
                        placeholder="RFC"
                        required
                        onChange={this.handleChange}
                        id="materno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Domicilio Fiscal</Label>
                      <Input
                        type="text"
                        placeholder="Domicilio Fiscal"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Logotipo</Label>
                      <Input
                        type="text"
                        placeholder="Logotipo"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Tipo</Label>
                      <Select
                        options={dummyData}
                        styles={customStyles}
                        isClearable={true}
                        placeholder={"-Selecciona-"}
                        theme={theme}
                        onChange={this.handleChangeEstadoNacimiento}
                        value={
                          this.state.estadoNacimiento === ""
                            ? null
                            : {
                                label: this.state.estadoNacimiento,
                                value: this.state.estadoNacimiento,
                              }
                        }
                      />
                      <input
                        tabIndex={-1}
                        style={{ opacity: 0, height: 0 }}
                        onChange={(e) => {}}
                        value={this.state.estadoNacimiento}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Centro</Label>
                      <Select
                        options={dummyData}
                        styles={customStyles}
                        isClearable={true}
                        placeholder={"-Selecciona-"}
                        theme={theme}
                        onChange={this.handleChangeEstadoNacimiento}
                        value={
                          this.state.estadoNacimiento === ""
                            ? null
                            : {
                                label: this.state.estadoNacimiento,
                                value: this.state.estadoNacimiento,
                              }
                        }
                      />
                      <input
                        tabIndex={-1}
                        style={{ opacity: 0, height: 0 }}
                        onChange={(e) => {}}
                        value={this.state.estadoNacimiento}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Modo</Label>
                      <Select
                        options={dummyData}
                        styles={customStyles}
                        isClearable={true}
                        placeholder={"-Selecciona-"}
                        theme={theme}
                        onChange={this.handleChangeEstadoNacimiento}
                        value={
                          this.state.estadoNacimiento === ""
                            ? null
                            : {
                                label: this.state.estadoNacimiento,
                                value: this.state.estadoNacimiento,
                              }
                        }
                      />
                      <input
                        tabIndex={-1}
                        style={{ opacity: 0, height: 0 }}
                        onChange={(e) => {}}
                        value={this.state.estadoNacimiento}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha Kick Off</Label>
                      <Input
                        type="date"
                        date-format="dd/mm/yyyy"
                        placeholder="Fecha Nacimiento"
                        onChange={this.handleChange}
                        id="fecha_nacimiento"
                        lang="es"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha Inicio Compromiso</Label>
                      <Input
                        type="date"
                        date-format="dd/mm/yyyy"
                        placeholder="Fecha Nacimiento"
                        onChange={this.handleChange}
                        id="fecha_nacimiento"
                        lang="es"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha Inicio Real</Label>
                      <Input
                        type="date"
                        date-format="dd/mm/yyyy"
                        placeholder="Fecha Nacimiento"
                        onChange={this.handleChange}
                        id="fecha_nacimiento"
                        lang="es"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Dias de Servicio</Label>
                    <br />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                      />
                      <Label className="form-check-label" check>
                        Lunes
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox2"
                        value="option2"
                      />
                      <Label className="form-check-label" check>
                        Martes
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check>
                        Miercoles
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check>
                        Jueves
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check>
                        Viernes
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check>
                        Sábado
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        id="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check>
                        Domingo
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <br />
                    <Label>Contactos Cliente</Label>
                    <br />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Contacto 1</Label>
                      <Input
                        type="text"
                        placeholder="Contacto 1"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-3">
                    <FormGroup>
                      <Label htmlFor="prospecto">Unidades Facturables</Label>
                      <Input
                        type="text"
                        placeholder="Unidades Facturables"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Descripción Unidades</Label>
                      <Input
                        type="text"
                        placeholder="Descripción Unidades"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-3">
                    <FormGroup>
                      <Label htmlFor="prospecto">Precio</Label>
                      <Input
                        type="text"
                        placeholder="Precio"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Condiciones de Pago</Label>
                      <Input
                        type="text"
                        placeholder="Condiciones de Pago"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Tabla de Penalizaciones</Label>
                      <Input
                        type="text"
                        placeholder="Ruta Archivo"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">
                        Responsable de Validar Facturas
                      </Label>
                      <Input
                        type="text"
                        placeholder="Responsable de Validar Facturas"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">
                        Frecuencia de Facturación
                      </Label>
                      <Input
                        type="text"
                        placeholder="Frecuencia de Facturación"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(1)}
              style={{ textAlign: "center" }}
            >
              Infraestructura y Telecomunicaciones
            </CardHeader>
            <Collapse isOpen={this.state.accordion[1]}>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Estaciones Operativas</Label>
                      <Input
                        type="text"
                        placeholder="Estaciones Operativas"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">
                        Estaciones Administrativas
                      </Label>
                      <Input
                        type="text"
                        placeholder="Estaciones Administrativas"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Equipos de Computo</Label>
                      <Input
                        type="text"
                        placeholder="Equipos de Computo"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hardphones</Label>
                      <Input
                        type="text"
                        placeholder="Hardphones"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Sillas</Label>
                      <Input
                        type="text"
                        placeholder="Sillas"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Diademas</Label>
                      <Input
                        type="text"
                        placeholder="Diademas"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Permisos (URL's)</Label>
                      <Input
                        type="text"
                        placeholder="Permisos (URL's)"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Documentos</Label>
                      <Input
                        type="text"
                        placeholder="Documentos"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Software Standard</Label>
                      <Input
                        type="text"
                        placeholder="Software Standard"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hardware Standard</Label>
                      <Input
                        type="text"
                        placeholder="Hardware Standard"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">FTP</Label>
                      <Input
                        type="text"
                        placeholder="FTP"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Carrier</Label>
                      <Input
                        type="text"
                        placeholder="Carrier"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">800's</Label>
                      <Input
                        type="text"
                        placeholder="800's"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Enlaces</Label>
                      <Input
                        type="text"
                        placeholder="Enlaces"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Llamadas Diarias</Label>
                      <Input
                        type="text"
                        placeholder="Llamadas Diarias"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Plataforma</Label>
                      <Input
                        type="text"
                        placeholder="Plataforma"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Skills</Label>
                      <Input
                        type="text"
                        placeholder="Skills"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(2)}
              style={{ textAlign: "center" }}
            >
              Desarrollo
            </CardHeader>
            <Collapse isOpen={this.state.accordion[2]}>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Dashboard</Label>
                      <Input
                        type="text"
                        placeholder="Si/No"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hoja de Solicitud</Label>
                      <Input
                        type="text"
                        placeholder="Archivo"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha de Reunion</Label>
                      <Input
                        type="text"
                        placeholder="Fecha Reunion"
                        required
                        onChange={this.handleChange}
                        id="materno"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">CRM</Label>
                      <Input
                        type="text"
                        placeholder="Si/No"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hoja de Solicitud</Label>
                      <Input
                        type="text"
                        placeholder="Archivo"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha de Reunion</Label>
                      <Input
                        type="text"
                        placeholder="Fecha Reunion"
                        required
                        onChange={this.handleChange}
                        id="materno"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Despachador</Label>
                      <Input
                        type="text"
                        placeholder="Si/No"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hoja de Solicitud</Label>
                      <Input
                        type="text"
                        placeholder="Archivo"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha de Reunion</Label>
                      <Input
                        type="text"
                        placeholder="Fecha Reunion"
                        required
                        onChange={this.handleChange}
                        id="materno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(3)}
              style={{ textAlign: "center" }}
            >
              Recursos Humanos
            </CardHeader>
            <Collapse isOpen={this.state.accordion[3]}>
              <CardBody>
                {" "}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Despachador</Label>
                      <Input
                        type="text"
                        placeholder="Si/No"
                        required
                        onChange={this.handleChange}
                        id="nombres"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Hoja de Solicitud</Label>
                      <Input
                        type="text"
                        placeholder="Archivo"
                        required
                        onChange={this.handleChange}
                        id="paterno"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha de Reunion</Label>
                      <Input
                        type="text"
                        placeholder="Fecha Reunion"
                        required
                        onChange={this.handleChange}
                        id="materno"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(4)}
              style={{ textAlign: "center" }}
            >
              Capacitación
            </CardHeader>
            <Collapse isOpen={this.state.accordion[4]}>
              <CardBody>5</CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(5)}
              style={{ textAlign: "center" }}
            >
              Operaciones
            </CardHeader>
            <Collapse isOpen={this.state.accordion[5]}>
              <CardBody>6</CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0">
            <CardHeader
              onClick={() => this.toggleAccordion(6)}
              style={{ textAlign: "center" }}
            >
              Calidad
            </CardHeader>
            <Collapse isOpen={this.state.accordion[6]}>
              <CardBody>7</CardBody>
            </Collapse>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Implementacion;
