import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/addoutlet.css";
import Header from "../components/Header";
import Loader from '../components/Loader';
import Swal from 'sweetalert2';


class EditEmployee extends React.Component {
  state = {
    finishChecking: false
  }

  componentDidMount = async () => {
    await this.props.checkLoginStatus()
    this.setState({finishChecking:true})
    this.props.getOutlet();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  handleForm = async e => {
    e.preventDefault();
    await this.props.editEmployee();
    this.props.history.push("/employee");
  };
  render() {
    const { listOutlet } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });

    if(!this.state.finishChecking){
      return <Loader
        height='100vh'
        scale='3'/>
    }
    if(!this.props.isLogin){
      return <Redirect to="/login"/>
    }
    if(!this.props.isOwner){
      Swal.fire('Tidak Punya Akses!', 'Halaman ini hanya untuk pemilik', 'error')
      return <Redirect to="/"/>
    }
    return (
      <React.Fragment>
        <Header pageLocation="Karyawan" />
        <div className="container ">
          <form
            action=""
            onSubmit={e => this.handleForm(e)}
            className="form-row box-form mx-auto mt-5 mb-5"
          >
            <div className="col-12 ">
              <div className="box-inside">
                <div className="col-12 text-center">
                  <h1>TAMBAH KARYAWAN</h1>
                </div>
                <div className="form-group  ">
                  <label for="nameEmployeeInput">Nama</label>

                  <input
                    type="text"
                    className="form-control"
                    id="nameEmployeeInput"
                    name="nameEmployeeInput"
                    onChange={e => this.handleInputFilter(e)}
                    value={this.props.nameEmployeeInput}
                    required
                  />
                </div>
                <div className="form-group  ">
                  <label for="username">Username</label>

                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={this.props.username}
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
                <div className="form-group  ">
                  <label for="password">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="*******"
                    onChange={e => this.handleInputFilter(e)}
                  />
                </div>

                <div className="form-group">
                  <label for="positionInput">Tipe</label>
                  <select
                    className="custom-select col-12 "
                    id="positionInput"
                    name="positionInput"
                    value={this.props.positionInput}
                    onChange={e => this.handleInputFilter(e)}
                    required
                  >
                    <option value="" disabled selected>
                      Pilih Tipe
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Kasir</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="idOutlet">Outlet</label>
                  <select
                    className="custom-select col-12 "
                    id="idOutlet"
                    name="idOutlet"
                    onChange={e => this.handleInputFilter(e)}
                  >
                    <option value="" disabled selected>
                      Pilih Outlet
                    </option>
                    {listAllOutlet}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <Link to="/employee" className="btn btn-register mr-2">
                Batal
              </Link>
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
export default connect(
  "isLogin, isOwner, listOutlet, nameEmployeeInput, username, password, confirmPassword, idOutlet, outletName, positionInput",
  actions
)(withRouter(EditEmployee));
