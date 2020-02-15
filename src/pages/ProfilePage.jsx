import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/addoutlet.css";
import Header from "../components/Header";
import ModalEditPassword from "../components/ModalEditPassword";

class Profile extends React.Component {
  componentDidMount = () => {
    this.props.getProfile();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value, edited: true });
  };
  handleInputImages = e => {
    store.setState({ nameFile: e.target.files[0], edited: true });
  };
  handleForm = () => {
    this.props.editProfile();
  };
  render() {
    return (
      <React.Fragment>
        <Header pageLocation="Profile" />
        <div className="container ">
          <form
            action=""
            onSubmit={e => e.preventDefault()}
            className="form-row box-form mx-auto mt-5 mb-5"
          >
            <div className="col-12 ">
              <div className="box-inside">
                <div className="col-12 text-center">
                  <h1>INFORMASI AKUN</h1>
                </div>
                <div className="form-group">
                  <label for="fullName">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    onChange={e => this.handleInputFilter(e)}
                    value={this.props.fullName}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="fullName">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    readOnly
                    onChange={e => this.handleInputFilter(e)}
                    value={this.props.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="personalPhone">Nomor Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    id="personalPhone"
                    name="personalPhone"
                    onChange={e => this.handleInputFilter(e)}
                    value={this.props.personalPhone}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="nameBusiness">Nama Bisnis</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameBusiness"
                    name="nameBusiness"
                    onChange={e => this.handleInputFilter(e)}
                    value={this.props.nameBusiness}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">Logo</label>
                  <input
                    type="file"
                    class="form-control-file"
                    name="fileName"
                    onChange={this.handleInputImages}
                  />
                </div>
                <div class="form-group">
                  <Link
                    href="#"
                    data-toggle="modal"
                    data-target="#editPassword"
                  >
                    Ubah Password
                  </Link>
                </div>
                <ModalEditPassword />
              </div>
            </div>

            <div className="col-12 text-center">
              {this.props.edited ? (
                <button
                  className="btn btn-register"
                  type="submit"
                  onClick={this.handleForm}
                >
                  Simpan
                </button>
              ) : (
                <button className="btn btn-register" type="submit" disabled>
                  Simpan
                </button>
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "edited, fullName, email, personalPhone, nameBusiness",
  actions
)(withRouter(Profile));
