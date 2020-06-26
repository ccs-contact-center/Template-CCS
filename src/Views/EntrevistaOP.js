import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import withAuth from "../Services/withAuth";
import { General, Candidatos } from "../Services/API_CCS";
import AuthService from "../Services/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Rating from "react-rating";
import moment from "moment";
import "moment/locale/es";

const MySwal = withReactContent(Swal);
const brandPrimary = getStyle("--primary");

const columns = [
  {
    title: "ID",
    field: "id",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60,
  },
  {
    title: "Nombres",
    field: "nombres",
    hozAlign: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 200,
  },
  {
    title: "Paterno",
    field: "paterno",
    hozAlign: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 200,
  },
  {
    title: "Materno",
    field: "materno",
    hozAlign: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 200,
  },
  {
    title: "Edad",
    field: "Edad",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 80,
  },
  {
    title: "Estado Civil",
    field: "edo_civil",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 135,
  },
  {
    title: "Campaña",
    field: "campania",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
  {
    title: "Turno",
    field: "turno",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
];

const options = {
  movableRows: true,
  pagination: "local",
  paginationSize: 5,
};

class EntrevistaRH extends Component {
  constructor(props) {
    super(props);
    this.General = new General();
    this.Candidatos = new Candidatos();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      data: [],
      selectedLead: null,
      loading: false,
      id_user: this.Auth.getProfile().id_ccs,
      isSaving: false,

      nombres: "",
      paterno: "",
      materno: "",

      status_entrevista: "",
      turno: "",
      motiivo_rechazo: "",
      campania: "",

      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      p6: "",
      p7: "",
      p8: "",
      p9: "",
      p10: "",
      p11: "",
      aprueba: "",
      comentarios: "",
      perfil: "",
    };
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  rowClick = (e, row) => {
    this.setState({
      selectedLead: `${row.getData().id}`,
      loading: true,
    });

    this.Candidatos.getCandidato(`${row.getData().id}`).then((res) => {
      var fecha = moment.utc(res[0].fecha_nacimiento).format("YYYY-MM-DD");
      this.setState({
        nombres: res[0].nombres,
        paterno: res[0].paterno,
        materno: res[0].materno,
        sexo: this.toTitleCase(res[0].sexo),
        fecha_nacimiento: fecha,
        estadoNacimiento: this.toTitleCase(res[0].edo_nacimiento),
        edo_civil: this.toTitleCase(res[0].edo_civil),
        CURP: res[0].CURP,
        RFC: res[0].RFC,
        NSS: res[0].NSS,
        dependientes: res[0].dep_economicos,
        escolaridad: this.toTitleCase(res[0].escolaridad),
        tipo_vial: this.toTitleCase(res[0].tipo_vial),
        calle: res[0].calle,
        exterior: res[0].ext,
        interior: res[0].int,
        entrecalles: res[0].entrecalles,
        cp: res[0].cp,
        colonia: this.toTitleCase(res[0].colonia),
        colonias: [],
        municipio: this.toTitleCase(res[0].del_mun),
        municipios: [],
        estado: this.toTitleCase(res[0].estado),
        campania: res[0].campania.toUpperCase(),
        turno: res[0].turno,

        tel_1: res[0].tel_cel,
        tel_2: res[0].tel_casa,
        email: res[0].email,
        claveEstado: "",
      });

      this.setState({ loading: false });
    });
  };

  closeUpdate = () => {
    this.setState({ selectedLead: null });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });
    this.Candidatos.updateCandidatoRolePlay(this.state)
      .then((res) => {
        MySwal.fire({
          title: "¡Correcto!",
          html: "¡Se guardó el registro correctamente!",
          type: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false,
        });

        document.getElementById("formReclu").reset();

        this.setState({
          nombres: "",
          paterno: "",
          materno: "",

          status_entrevista: "",
          campania: "",
          turno: "",
          motivo_rechazo: "",
        });

        this.updateTable();
        this.setState({ isSaving: false, selectedLead: null });
      })
      .catch((err) => {
        MySwal.fire({
          title: "Error!",
          html: "¡Ocurrió un error! <br/> (" + err + ")",
          type: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#C00327",
          allowOutsideClick: false,
        });

        document.getElementById("formReclu").reset();

        this.setState({
          nombres: "",
          paterno: "",
          materno: "",
          status_entrevista: "",
          campania: "",
          turno: "",
          motivo_rechazo: "",
        });
        this.setState({ isSaving: false });
      });
    this.setState({ isSaving: false });
  }

  updateTable() {
    this.Candidatos.getCandidatosRP()
      .then((response) => {
        return response;
      })
      .then((json) => {
        this.setState({ data: json });
      });
  }

  setRating(id, value) {
    this.setState({ [id]: value });
  }
  async componentDidMount() {
    this.updateTable();
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height={70} width={70} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.selectedLead == null ? (
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader className="text-center">
                      Entrevistas Pendientes
                    </CardHeader>
                    <CardBody className="text-center">
                      <ReactTabulator
                        rowClick={this.rowClick}
                        index={"id"}
                        data={this.state.data}
                        columns={columns}
                        tooltips={true}
                        layout={"fitColumns"}
                        options={options}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : null}

          {this.state.selectedLead != null ? (
            this.state.loading === true ? (
              <div
                style={{
                  height: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Loader
                    type="Oval"
                    color={brandPrimary}
                    height={100}
                    width={100}
                  />{" "}
                </div>
              </div>
            ) : (
              <div className="animated fade-in">
                <Row>
                  <Col>
                    <Card>
                      <CardHeader className="text-center">
                        Checklist
                        <div className="card-header-actions">
                          <Button
                            color="link"
                            className="card-header-action btn-close"
                            onClick={this.closeUpdate}
                          >
                            <i className="icon-close"></i>
                          </Button>
                        </div>
                      </CardHeader>
                      <Form
                        className="form-horizontal"
                        onSubmit={this.handleFormSubmit}
                        innerRef={this.formRef}
                        autoComplete="off"
                        id="formReclu"
                      >
                        <CardBody className="text-center">
                          <br />
                          <Row>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Nombres</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.nombres}
                                  id="nombres"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Paterno</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  id="paterno"
                                  value={this.state.paterno}
                                />
                              </FormGroup>
                            </Col>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Materno</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  id="materno"
                                  value={this.state.materno}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Status</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value="ACEPTADO"
                                  id="status"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Campaña</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  id="campania"
                                  value={this.state.campania}
                                />
                              </FormGroup>
                            </Col>
                            <Col className="col-sm-4">
                              <FormGroup>
                                <Label htmlFor="prospecto">Turno</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  id="turno"
                                  value={this.state.turno}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Table responsive striped>
                            <thead>
                              <tr>
                                <th>Rubro</th>
                                <th>Calificacion</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Presentación</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p1", value)
                                    }
                                    initialRating={this.state.p1}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p1}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Volumen de Voz</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p2", value)
                                    }
                                    initialRating={this.state.p2}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p2}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Dicción</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p3", value)
                                    }
                                    initialRating={this.state.p3}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p3}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Vocabulario</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p4", value)
                                    }
                                    initialRating={this.state.p4}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p4}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Facilidad de Palabra</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p5", value)
                                    }
                                    initialRating={this.state.p5}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p5}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Usa el nombre del Cliente</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p6", value)
                                    }
                                    initialRating={this.state.p6}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p6}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Enfatiza Beneficios</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p7", value)
                                    }
                                    initialRating={this.state.p7}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p7}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Pregunta para detectar necesidades</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p8", value)
                                    }
                                    initialRating={this.state.p8}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p8}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Cortesía</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p9", value)
                                    }
                                    initialRating={this.state.p9}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p9}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Cierre de Venta (Solo Ventas)</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p10", value)
                                    }
                                    initialRating={this.state.p10}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p10}
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Manejo de Objeciones (Solo Ventas)</td>
                                <td>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    onClick={(value) =>
                                      this.setRating("p11", value)
                                    }
                                    initialRating={this.state.p11}
                                  />
                                  <input
                                    tabIndex={-1}
                                    style={{ opacity: 0, height: 0 }}
                                    onChange={(e) => {}}
                                    value={this.state.p11}
                                    required
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label htmlFor="prospecto">
                                  Aprueba Role Play
                                </Label>
                                <Input
                                  type="select"
                                  required
                                  onChange={this.handleChange}
                                  id="aprueba"
                                  value={this.state.aprueba}
                                >
                                  <option value="">-Selecciona-</option>
                                  <option value={1}>Si</option>
                                  <option value={0}>No</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          {this.state.aprueba === "0" ? (
                            <div>
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <Label>Perfil</Label>
                                    <Input
                                      type="select"
                                      required
                                      onChange={this.handleChange}
                                      id="perfil"
                                      value={this.state.perfil}
                                    >
                                      <option value="">-Selecciona-</option>
                                      <option>Atención</option>
                                      <option>Ventas</option>
                                      <option>Cobranza</option>
                                      <option>Soporte</option>
                                      <option>Ninguno</option>
                                    </Input>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <Label>Comentarios</Label>
                                    <Input
                                      type="textarea"
                                      required
                                      onChange={this.handleChange}
                                      id="comentarios"
                                      value={this.state.comentarios}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          ) : null}
                          <Row>
                            <Col>
                              <button type="submit" className="btn btn-primary">
                                Guardar
                              </button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </div>
            )
          ) : null}
        </div>
      );
    }
  }
}

export default withAuth(EntrevistaRH);
