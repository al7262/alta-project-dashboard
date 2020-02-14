import React from "react";
import swal from 'sweetalert2';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/register.css";

class RegisterPage extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  handleOnChange = async (event)=>{
    const name = event.target.name, warning = document.getElementById('warning')
    let value = event.target.value
    const passLength = new RegExp(/(?=.{6,})/);
    const passUpper = new RegExp(/(?=.*[A-Z])/);
    const passNumber = new RegExp(/(?=.*[1-9])/);
    const emailRegex = new RegExp(/^(\w+[.-_]?\w+)@(\w+[.-_]?\w+).(\w{2,3})$/);
    if(name==='username'){
      if(value===''){
        warning.innerHTML='Tolong masukkan username/email'
      } 
    } else if(name==='password'){
        if(value===''){
          warning.innerHTML='Tolong masukkan password'
        }
    } else if(name==='confirmPassword'){
      if(value===''){
        warning.innerHTML='Tolong masukkan confirm password'
      } else if (!value.match(passLength)){
        warning.innerHTML='password mesti lebih dari 6 huruf';
      } else if (!value.match(passUpper)){
        warning.innerHTML='password mesti ada 1 huruf kapital';
      } else if (!value.match(passNumber)){
        warning.innerHTML='password mesti ada 1 angka';
      }
    }
    await this.setState({[name]:value})
    if(this.state.username===''){
      warning.innerHTML='Tolong masukkan username/email'
    } else if(!this.state.username.match(emailRegex)){
      warning.innerHTML='masukkan email dengan format yang benar'
    } else if(this.state.password===''){
      warning.innerHTML='Tolong masukkan password'
    } else if(this.state.confirmPassword===''){
      warning.innerHTML='Tolong masukkan confirm password'
    } else if(this.state.confirmPassword!==this.state.password){
      warning.innerHTML='password dan confirm tidak sama'
    } else{
      warning.innerHTML=''
    }
  }

  handleRegister = async() => {
    const input = {
      method: "post",
      url: await this.props.baseUrl+"/user/register",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: await this.state.username.toLowerCase(),
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
        this.props.history.push('/postregister')
        swal.fire({
          title: 'Welcome!',
          text: 'Kamu sudah berhasil mendaftar!',
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
        <div className="container-register">
          <div className="register-box">
            <div className="logo">
              <img src={logo} alt="application-logo" />
              <h1>EasyKachin'</h1>
            </div>
            <form action="" onSubmit={e => e.preventDefault()}>
              <label id="warning"></label>
              <input type="text" name="username" placeholder="Email" onChange={this.handleOnChange}/>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleOnChange}
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
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                />
                <span onClick={this.props.handleVisibilityConfirmPassword}>
                  <i className="material-icons" id="visibilityConfirmPassword">
                    visibility
                  </i>
                </span>
              </div>
            </form>
            <Link className="btn btn-register" onClick={this.handleRegister}>Daftar</Link>
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
export default connect("baseUrl, data", actions)(withRouter(RegisterPage));
