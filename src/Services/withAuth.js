import React, { Component } from "react";
import AuthService from "../Services/AuthService";
import { ws } from "../Services/Socket";

const AuthProfile = new AuthService();
const user = AuthProfile.getProfile();
const Auth = new AuthService();

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    state = { user: null };

    componentDidMount() {
      const { history } = this.props;
      if (!Auth.loggedIn()) {
        try {
          var d = new Date();
          var login = {
            type: "logout",
            data: {
              username: user.id_ccs,
              date: d,
            },
          };
          ws.send(JSON.stringify(login));
          history.replace("/Login");
        } catch (e) {
          history.replace("/Login");
        }
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          ws.send(JSON.stringify(login));
          Auth.logout();
          history.replace("/Login");
        }
      }
    }

    render() {
      const { user } = this.state;
      const { history } = this.props;

      if (user) {
        return <AuthComponent history={history} {...this.props} />;
      } else {
        return null;
      }
    }
  };
}
