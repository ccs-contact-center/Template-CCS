import React, { Component } from "react";
import AuthService from "../Services/AuthService";
import { socket } from "../Services/Socket";

const AuthProfile = new AuthService();
const user = AuthProfile.getProfile();

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        socket.emit("logoutUser", {
          username: user.id_ccs,
        });
        this.props.history.replace("/Login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          socket.emit("logoutUser", {
            username: user.id_ccs,
          });
          Auth.logout();
          this.props.history.replace("/Login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return <AuthComponent history={this.props.history} />;
      } else {
        return null;
      }
    }
  };
}
