import React, { Component } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";
import {
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../Assets/img/brand/logo.png";
import sygnet from "../../Assets/img/brand/logo.png";
import avatar from "../../Assets/img/brand/Unknown.jpg";

class DefaultHeader extends Component {
  render() {
    const { onLogout, myProfile } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, height: 37, alt: "CCS Logo" }}
          minimized={{ src: sygnet, height: 13, alt: "CCS Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={avatar} className="img-avatar" alt="admin.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Opciones</strong>
              </DropdownItem>
              <DropdownItem onClick={(e) => myProfile(e)}>
                <i className="fa fa-user"></i> Mi Perfil
              </DropdownItem>

              <DropdownItem onClick={(e) => onLogout(e)}>
                <i className="fa fa-lock"></i> Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
