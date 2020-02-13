import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/login.css";

class LoginPage extends React.Component {
  // HANDLE INPUT SEMENTARA
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  handleLogin = () => {
    const self = this;
    const req = {
      method: "post",
      url: `${self.props.baseUrl}/login/dashboard`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: self.props.username,
        password: self.props.password
      }
    };
    axios(req)
      .then(function(response) {
        if (response.data.hasOwnProperty("token")) {
          localStorage.setItem("username", self.props.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("status_login", true);
          self.props.history.push("/");
        }
        Swal.fire(
          "Login Sukses!",
          `Selamat Datang ${self.props.username}`,
          "success"
        );
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "username atau password tidak sesuai"
        });
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-login">
          <div className="login-box">
            <div className="logo">
              <img src={logo} alt="application-logo" />
              <h1>EasyKachin'</h1>
            </div>
            <form action="" onSubmit={e => e.preventDefault(e)}>
              <input
                type="text"
                name="username"
                placeholder="Username/Email"
                onChange={e => this.handleInput(e)}
              />
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={e => this.handleInput(e)}
                />
                <span onClick={this.props.handleVisibilityPassword}>
                  <i className="material-icons" id="visibilityPassword">
                    visibility
                  </i>
                </span>
              </div>
            </form>
            <Link className="btn btn-login" onClick={this.handleLogin}>
              Masuk
            </Link>
            <h1>
              Belum punya akun? Daftar{" "}
              <Link className="regis-sentence" to="/register">
                disini
              </Link>
            </h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "username, password, baseUrl",
  actions
)(withRouter(LoginPage));
