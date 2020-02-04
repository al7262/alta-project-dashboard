import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/postregister.css";

class PostRegister extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-postregister">
          <form className="form-row box-form">
            <div className="col-md-6 col-12 ">
              <div className="box-inside">
                <h1>INFORMASI AKUN</h1>
                <div className="form-group">
                  <label for="nama">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    name="nama"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="nomor-telepon">Nomor Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomor-telepon"
                    name="nomor-telepon"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="nama-bisnis">Nama Bisnis</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama-bisnis"
                    name="nama-bisnis"
                    required
                  />
                </div>
              </div>

              <div className="logo">
                <img src={logo} alt="application-logo" />
                <h1>EasyKachin'</h1>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="box-inside">
                <h1>INFORMASI OUTLET</h1>
                <div className="form-group">
                  <label for="nama-outlet">Nama Outlet</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama-outlet"
                    name="nama-outlet"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="alamat">Alamat</label>
                  <input
                    type="text"
                    className="form-control"
                    id="alamat"
                    name="alamat"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="kota">Kota</label>
                  <input
                    list="browsers"
                    name="browsers"
                    class="custom-select custom-select-md"
                  />
                  <datalist id="browsers">
                    <option value="Surabaya" />
                    <option value="Malang" />
                    <option value="Bandung" />
                    <option value="Semarang" />
                    <option value="Bandar Lampung" />
                  </datalist>
                </div>
                <div className="form-group">
                  <label for="pajak">Pajak</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pajak"
                    name="pajak"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="nomor-telepon-outlet">Nomor Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomor-telepon-outlet"
                    name="nomor-telepon-outlet"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-register" type="submit">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default connect("", actions)(withRouter(PostRegister));
