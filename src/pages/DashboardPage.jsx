import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";

import Header from "../components/Header";

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header pageLocation="Dashboard" />
      </React.Fragment>
    );
  }
}
export default connect("", actions)(withRouter(Dashboard));
