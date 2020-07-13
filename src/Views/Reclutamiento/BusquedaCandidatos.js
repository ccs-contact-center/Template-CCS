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
  Container,
} from "reactstrap";
import Select from "react-select";
import { General, Candidatos } from "../../Services/API_CCS";
import AuthService from "../../Services/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import "moment/locale/es";
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppFooter,
} from "@coreui/react";
import * as router from "react-router-dom";

const routes = [{ path: "/", exact: true, name: "Home" }];

const DefaultHeader = React.lazy(() =>
  import("../../Containers/DefaultLayout/LoggedOutHeader")
);
const DefaultFooter = React.lazy(() =>
  import("../../Containers/DefaultLayout/DefaultFooter")
);

const MySwal = withReactContent(Swal);
const brandPrimary = getStyle("--primary");

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

const estados = [
  { value: "Aguascalientes", label: "Aguascalientes" },
  { value: "Baja California", label: "Baja California" },
  { value: "Baja California Sur", label: "Baja California Sur" },
  { value: "Campeche", label: "Campeche" },
  { value: "Chiapas", label: "Chiapas" },
  { value: "Chihuahua", label: "Chihuahua" },
  { value: "Coahuila de Zaragoza", label: "Coahuila de Zaragoza" },
  { value: "Colima", label: "Colima" },
  { value: "Distrito Federal", label: "Distrito Federal" },
  { value: "Durango", label: "Durango" },
  { value: "Guanajuato", label: "Guanajuato" },
  { value: "Guerrero", label: "Guerrero" },
  { value: "Hidalgo", label: "Hidalgo" },
  { value: "Jalisco", label: "Jalisco" },
  { value: "México", label: "México" },
  { value: "Michoacán de Ocampo", label: "Michoacán de Ocampo" },
  { value: "Morelos", label: "Morelos" },
  { value: "Nayarit", label: "Nayarit" },
  { value: "Nuevo León", label: "Nuevo León" },
  { value: "Oaxaca", label: "Oaxaca" },
  { value: "Puebla", label: "Puebla" },
  { value: "Querétaro", label: "Querétaro" },
  { value: "Quintana Roo", label: "Quintana Roo" },
  { value: "San Luis Potosí", label: "San Luis Potosí" },
  { value: "Sinaloa", label: "Sinaloa" },
  { value: "Sonora", label: "Sonora" },
  { value: "Tabasco", label: "Tabasco" },
  { value: "Tamaulipas", label: "Tamaulipas" },
  { value: "Tlaxcala", label: "Tlaxcala" },
  {
    value: "Veracruz de Ignacio de la Llave",
    label: "Veracruz de Ignacio de la Llave",
  },
  { value: "Yucatán", label: "Yucatán" },
  { value: "Zacatecas", label: "Zacatecas" },
];

const estados2 = [
  { value: "Aguascalientes", label: "Aguascalientes" },
  { value: "Baja California", label: "Baja California" },
  { value: "Baja California Sur", label: "Baja California Sur" },
  { value: "Campeche", label: "Campeche" },
  { value: "Chiapas", label: "Chiapas" },
  { value: "Chihuahua", label: "Chihuahua" },
  { value: "Coahuila de Zaragoza", label: "Coahuila de Zaragoza" },
  { value: "Colima", label: "Colima" },
  { value: "Distrito Federal", label: "Distrito Federal" },
  { value: "Durango", label: "Durango" },
  { value: "Guanajuato", label: "Guanajuato" },
  { value: "Guerrero", label: "Guerrero" },
  { value: "Hidalgo", label: "Hidalgo" },
  { value: "Jalisco", label: "Jalisco" },
  { value: "México", label: "México" },
  { value: "Michoacán de Ocampo", label: "Michoacán de Ocampo" },
  { value: "Morelos", label: "Morelos" },
  { value: "Nayarit", label: "Nayarit" },
  { value: "Nuevo León", label: "Nuevo León" },
  { value: "Oaxaca", label: "Oaxaca" },
  { value: "Puebla", label: "Puebla" },
  { value: "Querétaro", label: "Querétaro" },
  { value: "Quintana Roo", label: "Quintana Roo" },
  { value: "San Luis Potosí", label: "San Luis Potosí" },
  { value: "Sinaloa", label: "Sinaloa" },
  { value: "Sonora", label: "Sonora" },
  { value: "Tabasco", label: "Tabasco" },
  { value: "Tamaulipas", label: "Tamaulipas" },
  { value: "Tlaxcala", label: "Tlaxcala" },
  {
    value: "Veracruz de Ignacio de la Llave",
    label: "Veracruz de Ignacio de la Llave",
  },
  { value: "Yucatán", label: "Yucatán" },
  { value: "Zacatecas", label: "Zacatecas" },
  { value: "Extranjero", label: "Extranjero" },
];

const brandColor = "#fc4669";

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

class EntrevistaRHC extends Component {
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
      id_user: "",
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
      status_entrevista: "",
      turno: "",
      motiivo_rechazo: "",
      campania: "",
    };
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  rowClick = async (e, row) => {
    this.setState({
      selectedLead: `${row.getData().id}`,
      loading: true,
    });

    await this.Candidatos.getCandidato(`${row.getData().id}`).then((res) => {
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
        status_entrevista: 0,
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
    var control = e.target.id;
    this.setState(
      {
        [e.target.id]: e.target.value,
      },
      () => {
        if (
          control === "nombres" ||
          control === "paterno" ||
          control === "materno" ||
          control === "sexo" ||
          control === "fecha_nacimiento" ||
          control === "estadoNacimiento"
        ) {
          this.conformCURP();
        } else {
        }
      }
    );
  }

  handleChangeCP = async (e) => {
    this.setState({ cp: e.target.value });

    if (e.target.value.length === 5) {
      try {
        var datos = await this.General.getCP(e.target.value);

        this.setState(
          { estado: datos[0][0].Estado },
          this.setState(
            {
              municipios: await this.General.getMunicipios(datos[0][0].Estado),
            },

            this.setState(
              {
                municipio: datos[0][0].Municipio,
                colonias: await this.General.getColonias(
                  datos[0][0].Estado,
                  datos[0][0].Municipio
                ),
              },
              () => {
                if (datos[0][0].Colonias.length > 1) {
                } else {
                  this.setState({
                    colonia: datos[0][0].Colonias[0],
                  });
                }
              }
            )
          )
        );
      } catch (err) {
        MySwal.fire(
          {
            title: "Error",
            text: "¡El código postal no existe!",
            allowOutsideClick: true,
            type: "error",
            confirmButtonColor: "#C00327",
            confirmButtonText: "Ok",
          },
          this.setState({
            cp: "",
            estado: "",
            municipio: "",
            colonia: "",
            municipios: [],
            colonias: [],
          })
        );
      }
    } else {
      this.setState({
        estado: "",
        municipio: "",
        colonia: "",
        municipios: [],
        colonias: [],
      });
    }
  };

  handleChangeEstado = (e) => {
    try {
      this.setState({ estado: e.label }, async () => {
        this.setState({
          municipios: await this.General.getMunicipios(this.state.estado),
        });
      });
    } catch (err) {
      this.setState({ estado: "" }, () => {
        this.setState({
          municipios: [],
          municipio: "",
          colonia: "",
          colonias: [],
          cp: "",
        });
      });
    }
  };

  handleChangeEstadoNacimiento = (e) => {
    try {
      this.setState({ estadoNacimiento: e.label }, async () => {
        var edoNac = await this.General.getClaveEstado(
          this.state.estadoNacimiento
        );

        this.setState(
          {
            claveEstado: edoNac[0].Clave_CURP,
          },
          () => {
            this.conformCURP();
          }
        );
      });
    } catch (err) {
      this.setState({ claveEstado: "", estadoNacimiento: "" });
    }
  };

  conformCURP() {
    try {
      var subsPaterno = this.state.paterno;
      var subsMaterno = this.state.materno;
      var susbsNombres = this.state.nombres;

      var mes = moment.utc(this.state.fecha_nacimiento).format("MM");
      var anio = moment.utc(this.state.fecha_nacimiento).format("YY");
      var dia = moment.utc(this.state.fecha_nacimiento).format("DD");
      var sexo;
      var estado = this.state.claveEstado;
      this.state.sexo === "Masculino" ? (sexo = "H") : (sexo = "M");

      var consonantsPaterno = subsPaterno.match(/[^aeiou$]/gi);
      var substrPaternoC = "";
      consonantsPaterno.forEach((item) => {
        substrPaternoC = substrPaternoC + item;
      });

      var consonantsMaterno = subsMaterno.match(/[^aeiou$]/gi);
      var substrMaternoC = "";
      consonantsMaterno.forEach((item) => {
        substrMaternoC = substrMaternoC + item;
      });

      var consonantsNombres = susbsNombres.match(/[^aeiou$]/gi);
      var substrNombresC = "";
      consonantsNombres.forEach((item) => {
        substrNombresC = substrNombresC + item;
      });

      var CURP =
        subsPaterno.substr(0, 2) +
        subsMaterno.substr(0, 1) +
        susbsNombres.substr(0, 1) +
        anio +
        mes +
        dia +
        sexo +
        estado +
        substrPaternoC.substr(1, 1) +
        substrMaternoC.substr(1, 1) +
        substrNombresC.substr(0, 1);

      var RFC =
        subsPaterno.substr(0, 2) +
        subsMaterno.substr(0, 1) +
        susbsNombres.substr(0, 1) +
        anio +
        mes +
        dia;

      CURP.length > 18
        ? console.log()
        : this.setState({
            CURP: CURP.toUpperCase(),
            RFC: RFC.toUpperCase(),
          });
    } catch (err) {}
  }

  handleChangeMunicipio = (e) => {
    try {
      this.setState({ municipio: e.label }, async () => {
        this.setState({
          colonias: await this.General.getColonias(
            this.state.estado,
            this.state.municipio
          ),
        });
      });
    } catch (err) {
      this.setState(
        { municipio: "", colonia: "", colonias: [], cp: "" },
        () => {}
      );
    }
  };

  handleChangeColonia = (e) => {
    try {
      this.setState({ colonia: e.label, cp: e.value }, async () => {});
    } catch (err) {
      this.setState({ colonia: "", cp: "" }, () => {});
    }
  };

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true, status_entrevista: 0 });

    this.Candidatos.updateCandidato(this.state)
      .then((res) => {
        MySwal.fire(
          {
            title: "¡Correcto!",
            html: "¡Se actualizó el registro correctamente!",
            type: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#C00327",
            allowOutsideClick: false,
          },
          this.props.history.replace("/Login")
        );

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
    this.setState({ isSaving: false });
  }

  async updateTable() {
    await this.Candidatos.getCandidatos([1, 2])
      .then((response) => {
        return response;
      })
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((err) => console.log(err));
  }

  async componentDidMount() {
    await this.updateTable();
    this.setState({
      campanias: await this.populateCampanias(),
    });
  }

  async populateCampanias() {
    var CampaniasJSON = await this.requestCampanias();
    return CampaniasJSON.map((data, i) => {
      return (
        <option key={data.id_campania} value={data.campania}>
          {data.campania}
        </option>
      );
    });
  }

  requestCampanias = async () => {
    const response = await this.General.getCampanias();
    return response;
  };

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
              <AppHeader fixed>
                <DefaultHeader />
              </AppHeader>

              <Container>
                <AppBreadcrumb appRoutes={routes} router={router} />
                <Row>
                  <Col>
                    <Card>
                      <CardHeader className="text-center">
                        Registro Historico
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
              </Container>
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
              <div className="animated fadeIn">
                <AppHeader fixed>
                  <DefaultHeader />
                </AppHeader>
                <Container>
                  <AppBreadcrumb appRoutes={routes} router={router} />
                  <Card>
                    <CardHeader className="text-center">
                      Datos Generales
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

                    <CardBody>
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
                                required
                                onChange={this.handleChange}
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
                                placeholder="Apellido Paterno"
                                required
                                onChange={this.handleChange}
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
                                placeholder="Apellido Materno"
                                required
                                onChange={this.handleChange}
                                id="materno"
                                value={this.state.materno}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">Sexo</Label>
                              <Input
                                type="select"
                                placeholder="Categoría"
                                required
                                onChange={this.handleChange}
                                id="sexo"
                                value={this.state.sexo}
                              >
                                <option value="">-Selecciona-</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">
                                Fecha de Nacimiento
                              </Label>
                              <Input
                                type="date"
                                date-format="dd/mm/yyyy"
                                placeholder="Fecha Nacimiento"
                                onChange={this.handleChange}
                                id="fecha_nacimiento"
                                lang="es"
                                value={this.state.fecha_nacimiento}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">
                                Lugar de Nacimiento
                              </Label>
                              <Select
                                options={estados2}
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
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">Estado Civil</Label>
                              <Input
                                type="select"
                                placeholder="Categoría"
                                required
                                onChange={this.handleChange}
                                id="edo_civil"
                                value={this.state.edo_civil}
                              >
                                <option value="">-Selecciona-</option>
                                <option>Casado</option>
                                <option>Divorciado</option>
                                <option>Soltero</option>
                                <option>Union Libre</option>
                                <option>Viudo</option>
                              </Input>
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
                                required
                                onChange={this.handleChange}
                                id="CURP"
                                value={this.state.CURP}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-4">
                            <FormGroup>
                              <Label htmlFor="prospecto">RFC</Label>
                              <Input
                                type="text"
                                placeholder="RFC"
                                required
                                onChange={this.handleChange}
                                id="RFC"
                                value={this.state.RFC}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-4">
                            <FormGroup>
                              <Label htmlFor="prospecto">NSS</Label>
                              <Input
                                type="text"
                                required
                                placeholder="NSS"
                                onChange={this.handleChange}
                                id="NSS"
                                value={this.state.NSS}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-sm-6">
                            <FormGroup>
                              <Label htmlFor="prospecto">¿Tienes Hijos?</Label>
                              <Input
                                type="select"
                                placeholder="Categoría"
                                required
                                onChange={this.handleChange}
                                id="dependientes"
                                value={this.state.dependientes}
                              >
                                <option value="">-Selecciona-</option>
                                <option value="0">No</option>
                                <option value="1">Si</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-6">
                            <FormGroup>
                              <Label htmlFor="prospecto">Escolaridad</Label>
                              <Input
                                type="select"
                                required
                                placeholder="Categoría"
                                onChange={this.handleChange}
                                id="escolaridad"
                                value={this.state.escolaridad}
                              >
                                <option value="">-Selecciona-</option>
                                <option>Secundaria</option>
                                <option>Bachillerato Trunco</option>
                                <option>Bachillerato</option>
                                <option>Carrera Técnica</option>
                                <option>Licenciatura Trunca</option>
                                <option>Licenciatura</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-sm-2">
                            <FormGroup>
                              <Label htmlFor="prospecto">Tipo Vial</Label>
                              <Input
                                type="select"
                                placeholder="Categoría"
                                required
                                onChange={this.handleChange}
                                id="tipo_vial"
                                value={this.state.tipo_vial}
                              >
                                <option value="">-Selecciona-</option>
                                <option>Andador</option>
                                <option>Autopista</option>
                                <option>Avenida</option>
                                <option>Boulevard</option>
                                <option>Calle</option>
                                <option>Callejón</option>
                                <option>Calzada</option>
                                <option>Camino</option>
                                <option>Carretera</option>
                                <option>Cerrada</option>
                                <option>Circuito</option>
                                <option>Circunvalación</option>
                                <option>Diagonal</option>
                                <option>Eje</option>
                                <option>Libramiento</option>
                                <option>Parque</option>
                                <option>Pasaje</option>
                                <option>Paseo</option>
                                <option>Periferico</option>
                                <option>Plaza</option>
                                <option>Privada</option>
                                <option>Prolongación</option>
                                <option>Retorno</option>
                                <option>Viaducto</option>
                                <option>Rinconada</option>
                                <option>Via</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-6">
                            <FormGroup>
                              <Label htmlFor="prospecto">Calle</Label>
                              <Input
                                type="text"
                                placeholder="Calle"
                                required
                                onChange={this.handleChange}
                                id="calle"
                                value={this.state.calle}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-1">
                            <FormGroup>
                              <Label htmlFor="prospecto">Exterior</Label>
                              <Input
                                type="text"
                                placeholder="Ext."
                                required
                                onChange={this.handleChange}
                                id="exterior"
                                value={this.state.exterior}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-1">
                            <FormGroup>
                              <Label htmlFor="prospecto">Interior</Label>
                              <Input
                                type="text"
                                placeholder="Int."
                                required
                                onChange={this.handleChange}
                                id="interior"
                                value={this.state.interior}
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
                                required
                                onChange={this.handleChange}
                                id="entrecalles"
                                value={this.state.entrecalles}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="col-sm-2">
                            <FormGroup>
                              <Label htmlFor="prospecto">Código Postal</Label>
                              <Input
                                type="number"
                                pattern="[0-9]{10}"
                                placeholder="CP"
                                required
                                onChange={this.handleChangeCP}
                                value={this.state.cp}
                                id="cp"
                                maxLength="5"
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">Colonia</Label>
                              <Select
                                options={this.state.colonias}
                                styles={customStyles}
                                isClearable={true}
                                placeholder={"-Selecciona-"}
                                theme={theme}
                                onChange={this.handleChangeColonia}
                                value={
                                  this.state.colonia === ""
                                    ? null
                                    : {
                                        label: this.state.colonia,
                                        value: this.state.colonia,
                                      }
                                }
                              />
                              <input
                                tabIndex={-1}
                                style={{ opacity: 0, height: 0 }}
                                onChange={(e) => {}}
                                value={this.state.colonia}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-3">
                            <FormGroup>
                              <Label htmlFor="prospecto">
                                Delegación/Municipio
                              </Label>
                              <Select
                                options={this.state.municipios}
                                styles={customStyles}
                                isClearable={true}
                                placeholder={"-Selecciona-"}
                                theme={theme}
                                onChange={this.handleChangeMunicipio}
                                value={
                                  this.state.municipio === ""
                                    ? null
                                    : {
                                        label: this.state.municipio,
                                        value: this.state.municipio,
                                      }
                                }
                              />
                              <input
                                tabIndex={-1}
                                style={{ opacity: 0, height: 0 }}
                                onChange={(e) => {}}
                                value={this.state.municipio}
                                required
                              />
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-4">
                            <FormGroup>
                              <Label htmlFor="prospecto">Estado</Label>
                              <Select
                                options={estados}
                                styles={customStyles}
                                isClearable={true}
                                placeholder={"-Selecciona-"}
                                theme={theme}
                                onChange={this.handleChangeEstado}
                                value={
                                  this.state.estado === ""
                                    ? null
                                    : {
                                        label: this.state.estado,
                                        value: this.state.estado,
                                      }
                                }
                              />
                              <input
                                tabIndex={-1}
                                style={{ opacity: 0, height: 0 }}
                                onChange={(e) => {}}
                                value={this.state.estado}
                                required
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
                                pattern="[0-9]{10}"
                                placeholder="5555555555"
                                required
                                onChange={this.handleChange}
                                id="tel_1"
                                value={this.state.tel_1}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="col-sm-4">
                            <FormGroup>
                              <Label htmlFor="prospecto">Tel Casa</Label>
                              <Input
                                type="text"
                                pattern="[0-9]{10}"
                                placeholder="5555555555"
                                required
                                onChange={this.handleChange}
                                id="tel_2"
                                value={this.state.tel_2}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-sm-4">
                            <FormGroup>
                              <Label htmlFor="prospecto">Email</Label>
                              <Input
                                type="email"
                                placeholder="Email"
                                required
                                onChange={this.handleChange}
                                id="email"
                                value={this.state.email}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <button type="submit" className="btn btn-primary">
                              Guardar
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Container>
                <br />
                <br />
                <AppFooter fixed>
                  <DefaultFooter />
                </AppFooter>
              </div>
            )
          ) : null}
        </div>
      );
    }
  }
}

export default EntrevistaRHC;
