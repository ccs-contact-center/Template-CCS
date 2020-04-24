import React, { Component } from "react";
import AuthService from "../Services/AuthService";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService("https://api.ccscontactcenter.com");
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/Login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
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
