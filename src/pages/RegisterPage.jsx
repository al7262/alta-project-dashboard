import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/register.css";

class RegisterPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-register">
          <div className="register-box">
            <div className="logo">
              <img src={logo} alt="application-logo" />
              <h1>EasyKachin'</h1>
            </div>
            <form action="" onSubmit={e => e.preventDefault()}>
              <input type="text" name="username" placeholder="Username/Email" />
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <span onClick={this.props.handleVisibilityPassword}>
                  <i className="material-icons" id="visibilityPassword">
                    visibility
                  </i>
                </span>
              </div>
              <div className="confirm-password">
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                />
                <span onClick={this.props.handleVisibilityConfirmPassword}>
                  <i className="material-icons" id="visibilityConfirmPassword">
                    visibility
                  </i>
                </span>
              </div>
            </form>
            <Link className="btn btn-register">Daftar</Link>
            <h1>
              Sudah punya akun? Masuk{" "}
              <Link className="regis-sentence" to="/login">
                disini
              </Link>
            </h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect("", actions)(withRouter(RegisterPage));
