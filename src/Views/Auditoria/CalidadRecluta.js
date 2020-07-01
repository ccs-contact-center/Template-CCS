import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import withAuth from "../../Services/withAuth";
import { General, Candidatos, Usuarios } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import "moment/locale/es";
import md5 from "md5";

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
    alhozAlignign: "center",
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
    this.Usuarios = new Usuarios();
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
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  generateUser(nombres, paterno, materno) {
    var tNombres = nombres.replace(/ /g, "");
    var tPaterno = paterno.replace(/ /g, "");
    var tMaterno = materno.replace(/ /g, "");

    var user =
      tNombres.substring(0, 1) +
      tPaterno.substring(0, 4) +
      tMaterno.substring(0, 3);

    return user.toLowerCase();
  }

  rowClick = (e, row) => {
    this.setState({
      selectedLead: `${row.getData().id}`,
    });

    var currentTime = new Date();

    this.Candidatos.getCandidato(`${row.getData().id}`)
      .then((res) => {
        var fecha = moment.utc(res[0].fecha_nacimiento).format("YYYY-MM-DD");
        this.setState({
          nombres: res[0].nombres,
          paterno: res[0].paterno,
          materno: res[0].materno,
          sexo: this.toTitleCase(res[0].sexo),
          fecha_nacimiento: fecha,
          edo_nacimiento: this.toTitleCase(res[0].edo_nacimiento),
          edo_civil: this.toTitleCase(res[0].edo_civil),
          CURP: res[0].CURP,
          RFC: res[0].RFC,
          NSS: res[0].NSS,
          dep_economicos: res[0].dep_economicos,
          escolaridad: this.toTitleCase(res[0].escolaridad),
          tipo_vial: this.toTitleCase(res[0].tipo_vial),
          calle: res[0].calle,
          ext: res[0].ext,
          int: res[0].int,
          entrecalles: res[0].entrecalles,
          cp: res[0].cp,
          colonia: this.toTitleCase(res[0].colonia),
          colonias: [],
          del_mun: this.toTitleCase(res[0].del_mun),
          municipios: [],
          estado: this.toTitleCase(res[0].estado),
          tipeo: res[0].tipeo,
          ortografia: res[0].ortografia,
          reclutador: res[0].reclutador,
          tel_1: res[0].tel_cel,
          tel_2: res[0].tel_casa,
          email: res[0].email,
          claveEstado: "",
          su: 0,
          empleado_sim: null,
          id_ccs: null,
          pass_ccs: null,
          status: 0,
          status_anterior: null,
          ultimo_movimiento: moment(currentTime).format("YYYY-MM-DD hh:mm:ss"),
          user_ultimo_movimiento: this.Auth.getProfile().id_ccs,
          ultimo_ingreso: null,
          role: 0,
          adic_views: null,
          modo: 0,
          centro: 0,
          campania: res[0].campania,
          area: 0,
          puesto: 0,
          jefe_directo: null,
          analista: 0,
          instructor: 0,
          fecha_preingreso: null,
          fecha_capacitacion: null,
          fecha_alta: null,
          fecha_servicio: null,
          entrada: null,
          salida: null,
          email_ccs: null,
          fecha_baja: null,
          motivo_baja: null,
          comentrios_baja: null,
          blacklisted: 0,
          id_candidato: this.state.selectedLead,
        });
      })
      .then(async (res) => {
        var data = await this.getCampaignID(this.state.campania);
        this.setState({ campania: data[0].id });
      })
      .then((res) => console.log(this.state))
      .then((res) => {
        MySwal.fire({
          title: "Confirmar Candidato",
          allowOutsideClick: true,
          text: "¿Cumple Calidad de la Recluta?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#C00327",
          cancelButtonColor: "#C00327",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value === true) {
            this.setState(
              {
                status_entrevista: 6,
                id_ccs: this.generateUser(
                  this.state.nombres,
                  this.state.paterno,
                  this.state.materno
                ),
                pass_ccs: md5(
                  this.generateUser(
                    this.state.nombres,
                    this.state.paterno,
                    this.state.materno
                  )
                ),
              },
              () => {
                ////////////////////////////////
                this.Usuarios.insertUsuario(this.state).then((res) => {
                  if (res.id === 0) {
                    MySwal.fire({
                      title: "Error!",
                      html:
                        "¡El agente ya existe, por favor notificalo a reclutamiento!",
                      type: "error",
                      confirmButtonText: "OK",
                      confirmButtonColor: "#C00327",
                      allowOutsideClick: false,
                    });
                  } else {
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
                  }
                });

                /////////////////////
              }
            );
          } else if (result.value === false) {
            this.setState({ status_entrevista: 4 }, () => {
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
    this.Candidatos.getCandidatosAuditoria()
      .then((response) => {
        return response;
      })
      .then((json) => {
        this.setState({ data: json });
      });
  }

  getCampaignID = async (name) => {
    var x = await this.General.getCampaignIdByName(name);
    return x;
  };
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
                    Candidatos a Auditar
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
