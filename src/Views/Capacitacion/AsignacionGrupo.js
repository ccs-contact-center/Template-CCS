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
import AsignForm from "./AsignForm";
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

class AsignacionGrupo extends Component {
  constructor(props) {
    super(props);
    this.General = new General();
    this.Candidatos = new Candidatos();
    this.Usuarios = new Usuarios();
    this.Auth = new AuthService();
    this.state = {
      data: [],
      selected: null,
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
      selected: `${row.getData().id}`,
    });

    MySwal.fire({
      type: "info",
      html: <AsignForm />,
      showConfirmButton: false,
      padding: "0em",
      allowOutsideClick: true,
    });
  };

  updateTable() {
    this.Usuarios.getUsuarios([0])
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
                    Asignación de Instructor
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

export default withAuth(AsignacionGrupo);
