import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";
import Swal from 'sweetalert2';

import Header from "../components/Header";
import icon from "../images/icon-edit.png";
import Loader from "../components/Loader";

class OutletPage extends React.Component {
  state = {
    finishChecking: false
  }

  componentDidMount = async () => {
    await this.props.checkLoginStatus()
    this.setState({finishChecking:true})
    this.props.getOutlet();
    store.setState({
      nameOutlet: ""
    });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getOutlet();
  };
  render() {
    const { listOutlet, isLoadingOutlet } = this.props;
    const listAllOutlet = listOutlet.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.city}</td>
          <td>{item.tax} %</td>
          <td>
            <div className="dropright">
              <img
                className="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                src={icon}
                alt="icon-edit"
              />

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  className="dropdown-item"
                  to="/outlet/edit"
                  onClick={() => this.props.getOutletById(item.id)}
                >
                  Ubah
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => this.props.deleteOutletById(item.id)}
                >
                  Hapus
                </Link>
              </div>
            </div>
          </td>
        </tr>
      );
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
        <Header pageLocation="Outlet" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Link
              className="btn btn-tambah"
              to="/outlet/add"
              onClick={this.props.handleBack}
            >
              Tambah
            </Link>
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-12 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameOutlet"
                name="nameOutlet"
                onChange={e => this.handleInputFilter(e)}
                placeholder="Outlet/Kota"
              />
            </div>
          </form>
          <div className="col-12 box-content">
            {isLoadingOutlet ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kota</th>
                    <th scope="col">Pajak</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{listAllOutlet}</tbody>
              </table>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "isLogin, isOwner, listOutlet, isLoadingOutlet, nameOutlet",
  actions
)(withRouter(OutletPage));
