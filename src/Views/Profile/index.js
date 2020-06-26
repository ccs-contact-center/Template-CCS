import React, { Component, Suspense } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Loader from "react-loader-spinner";
import MyProfile from "./MyProfile";
import avatar from "../../Assets/img/brand/Unknown.jpg";

class Llamada_General extends Component {
  state = {
    isSaving: false,
    activeTab: new Array(4).fill("1"),
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <MyProfile />
        </TabPane>
        <TabPane tabId="2">
          {<div className="animated fadeIn">Calidad</div>}
        </TabPane>
        <TabPane tabId="3">
          {<div className="animated fadeIn">Capacitación</div>}
        </TabPane>
      </>
    );
  }

  titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
            <Loader type="Oval" color={"#C00327"} height={70} width={70} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Container fluid>
            <Suspense fallback={this.loading()}>
              <Card>
                <CardHeader className="text-center">Mi Perfil</CardHeader>

                <CardBody>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                      src={avatar}
                      className="img-avatar"
                      alt="admin.com"
                      style={{ width: "15vw" }}
                    />
                    <br />
                    <br />
                    <h2 style={{ color: "rgba(88,88,90,0.8)" }}>
                      Isaac Contreras
                    </h2>
                  </div>
                  <Row>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "1"}
                            onClick={() => {
                              this.toggle(0, "1");
                            }}
                          >
                            Mis Datos
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle(0, "2");
                            }}
                          >
                            Calidad
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "3"}
                            onClick={() => {
                              this.toggle(0, "3");
                            }}
                          >
                            Capacitación
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {this.tabPane()}
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Suspense>
          </Container>
        </div>
      );
    }
  }
}

export default Llamada_General;
