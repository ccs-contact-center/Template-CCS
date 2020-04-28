import React, { Component } from "react";

import withAuth from "../Services/withAuth";
import AllPost from "../Views/Post/AllPost";

class Dashboard extends Component {
  render() {
    return <AllPost />;
  }
}

export default withAuth(Dashboard);
