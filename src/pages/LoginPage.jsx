import React from "react";
import axios from "axios";
import swal from "sweetalert2";

import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/login.css";

class LoginPage extends React.Component {
  state = {
    username: undefined,
    password: undefined,
  }

  handleOnChange = async (event)=>{
    const name = event.target.name, warning = document.getElementById('warning')
    let value = event.target.value
    if(name==='username'){
      if(value===''){
        warning.innerHTML='Tolong masukkan username/email'
      } 
    } else if(name==='password'){
        if(value===''){
          warning.innerHTML='Tolong masukkan password'
        }
    }
    await this.setState({[name]:value})
    if(this.state.username===''){
        warning.innerHTML='Tolong masukkan username/email'
    } else if(this.state.password===''){
        warning.innerHTML='Tolong masukkan password'
    } else{
        warning.innerHTML=''
    }
  }

  handleLogin = async () => {
    const input = {
      method: "post",
      url: await this.props.baseUrl+"/login/dashboard",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: await this.state.username.toLowerCase(),
        password: await this.state.password
      },
      validateStatus: (status) => {
        return status<500
      }
    };
    swal.showLoading()
    await this.props.handleApi(input)
    this.props.handleError()
    const data = await this.props.data
    if(data!==undefined){
      if(data.hasOwnProperty('token')){
        localStorage.setItem('token', this.props.data.token)
        await this.props.handleInput('isLogin', true)
        this.props.history.push('/')
        swal.fire({
          title: 'Welcome!',
          text: 'Kamu sudah berhasil masuk!',
          icon: 'success',
          timer: 3000,
          confirmButtonText: 'okay'
        })
      }
    }
  }
  
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
              <label id="warning"></label>
              <input
                type="text"
                name="username"
                placeholder="Username/Email"
                onChange={e => this.handleOnChange(e)}
              />
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={e => this.handleOnChange(e)}
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
  "username, password, baseUrl, data",
  actions
)(withRouter(LoginPage));
