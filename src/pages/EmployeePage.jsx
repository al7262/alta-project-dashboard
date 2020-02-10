import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";
import icon from "../images/icon-edit.png";

import Header from "../components/Header";
import Loader from "../components/Loader";
class EmployeePage extends React.Component {
  componentDidMount = () => {
    this.props.getEmployee();
    this.props.getOutlet();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getEmployee();
  };
  render() {
    const { listEmployee, listOutlet, isLoadingEmployee } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.name}>{item.name}</option>;
    });
    const listAllEmployee = listEmployee.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.full_name}</td>
          <td>{item.position}</td>
          <td>{item.name_outlet}</td>
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
                  to="/employee/edit"
                  onClick={() => this.props.getEmployeeById(item.id)}
                >
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => this.props.deleteEmployeeById(item.id)}
                >
                  Hapus
                </Link>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Karyawan" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Link to="/employee/add" className="btn btn-tambah">
              Tambah
            </Link>
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-4 form-group">
              <h1>Outlet</h1>
              <select
                className="custom-select col-12 "
                id="outlet"
                name="outlet"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Outlet</option>
                {listAllOutlet}
              </select>
            </div>
            <div className="col-4 form-group">
              <h1>Tipe Karyawan</h1>
              <select
                className="custom-select col-12 "
                id="position"
                name="position"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Tipe</option>
                <option value="Admin">Admin</option>
                <option value="Kasir">Kasir</option>
              </select>
            </div>
            <div className="col-4 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameEmployee"
                name="nameEmployee"
                placeholder="Nama"
                onChange={e => this.handleInputFilter(e)}
              />
            </div>
          </form>
          <div className="col-12 box-content">
            {isLoadingEmployee ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Tipe</th>
                    <th scope="col">Outlet</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{listAllEmployee}</tbody>
              </table>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listEmployee, listOutlet, isLoadingEmployee",
  actions
)(withRouter(EmployeePage));
