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

import Campañas from "./Implementacion";
import AltaCampañas from "./AltaCampañas";

class Llamada_General extends Component {
  state = {
    isSaving: false,
    accordion: [true, false, false],
    activeTab: new Array(4).fill("1"),
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <div>Campañas Activas</div>
        </TabPane>
        <TabPane tabId="2">
          <AltaCampañas />
        </TabPane>
        <TabPane tabId="3">
          <Campañas />
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Suspense fallback={this.loading()}>
            <Card>
              <CardHeader className="text-center">Campañas</CardHeader>

              <CardBody>
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
                          Campañas Activas
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === "2"}
                          onClick={() => {
                            this.toggle(0, "2");
                          }}
                        >
                          Alta Campañas
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === "3"}
                          onClick={() => {
                            this.toggle(0, "3");
                          }}
                        >
                          Ficha Implementación
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

export default Llamada_General;
