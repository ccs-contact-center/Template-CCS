import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import withAuth from "../../Services/withAuth";
import { General, Candidatos } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
    title: "Fecha Reclutamiento",
    field: "Fecha_Reclutamiento",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100,
  },
  {
    title: "Candidato",
    field: "Candidato",
    hozAlign: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 300,
  },
  {
    title: "Fecha de Nacimiento",
    field: "Fecha_Nacimiento",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100,
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
    title: "Celular",
    field: "tel_cel",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
  {
    title: "Fijo",
    field: "tel_casa",
    hozAlign: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
  {
    title: "e-mail",
    field: "email",
    hozAlign: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 200,
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
    this.state = {
      data: [],
      selectedLead: null,
      loading: false,
      id_user: this.Auth.getProfile().id_ccs,
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
      municipio: "",
      estado: "",
      estadoNacimiento: "",
      tel_1: "",
      tel_2: "",
      email: "",
      claveEstado: "",
      motivo2: "",
      tipeo: "",
      ortografia: "",

      status_entrevista: "",
      turno: "",
      motivo_rechazo: "",
      campania: "",
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
    });

    this.Candidatos.getCandidato(`${row.getData().id}`)
      .then((res) => {
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
          tipeo: res[0].tipeo,
          ortografia: res[0].ortografia,

          tel_1: res[0].tel_cel,
          tel_2: res[0].tel_casa,
          email: res[0].email,
          claveEstado: "",
        });
      })
      .then((res) => {
        MySwal.fire({
          title: "Confirmar Candidato",
          allowOutsideClick: true,
          text: "¿El candidato se presentó a capacitación?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#C00327",
          cancelButtonColor: "#C00327",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value === true) {
            this.setState({ status_entrevista: 5 }, () => {
              this.Candidatos.updateCandidato(this.state)
                .then((res) => {
                  MySwal.fire({
                    title: "¡Correcto!",
                    html: "¡Se guardó el registro correctamente!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#C00327",
                    allowOutsideClick: false,
                  });

                  this.updateTable();
                  this.setState({
                    cp: "",
                    estado: "",
                    municipio: "",
                    colonia: "",
                    municipios: [],
                    colonias: [],
                    estadoNacimiento: "",
                    CURP: "",
                    RFC: "",
                    nombres: "",
                    paterno: "",
                    materno: "",
                    fecha_nacimiento: "",
                    sexo: "",
                    status_entrevista: "",
                    campania: "",
                    turno: "",
                    motivo_rechazo: "",
                  });

                  this.setState({ selectedLead: null });
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

                  this.setState({
                    cp: "",
                    estado: "",
                    municipio: "",
                    colonia: "",
                    municipios: [],
                    colonias: [],
                    estadoNacimiento: "",
                    CURP: "",
                    RFC: "",
                    nombres: "",
                    paterno: "",
                    materno: "",
                    fecha_nacimiento: "",
                    sexo: "",
                    status_entrevista: "",
                    campania: "",
                    turno: "",
                    motivo_rechazo: "",
                  });
                  this.setState({ isSaving: false });
                });
            });
          } else if (result.value === false) {
            this.setState({ status_entrevista: 0 }, () => {
              this.Candidatos.updateCandidato(this.state)
                .then((res) => {
                  MySwal.fire({
                    title: "¡Correcto!",
                    html: "¡Se guardó el registro correctamente!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#C00327",
                    allowOutsideClick: false,
                  });
                  this.updateTable();
                  this.setState({
                    cp: "",
                    estado: "",
                    municipio: "",
                    colonia: "",
                    municipios: [],
                    colonias: [],
                    estadoNacimiento: "",
                    CURP: "",
                    RFC: "",
                    nombres: "",
                    paterno: "",
                    materno: "",
                    fecha_nacimiento: "",
                    sexo: "",
                    status_entrevista: "",
                    campania: "",
                    turno: "",
                    motivo_rechazo: "",
                  });

                  this.setState({ selectedLead: null });
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

                  this.setState({
                    cp: "",
                    estado: "",
                    municipio: "",
                    colonia: "",
                    municipios: [],
                    colonias: [],
                    estadoNacimiento: "",
                    CURP: "",
                    RFC: "",
                    nombres: "",
                    paterno: "",
                    materno: "",
                    fecha_nacimiento: "",
                    sexo: "",
                    status_entrevista: "",
                    campania: "",
                    turno: "",
                    motivo_rechazo: "",
                  });
                  this.setState({ isSaving: false });
                });
            });
          } else {
            console.log("Click outside");
          }
        });
      });
  };

  updateTable() {
    this.Candidatos.getCandidatos([4])
      .then((response) => {
        return response;
      })
      .then((json) => {
        this.setState({ data: json });
      });
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
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader className="text-center">
                    Candidatos a Confirmar
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
        </div>
      );
    }
  }
}

export default withAuth(EntrevistaRH);
