import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";
import icon from "../images/icon-edit.png";

import Header from "../components/Header";
import Button from "../components/Button";
import ModalAddInventory from "../components/ModalAddInventory";

class InventoryPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getInventory();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getInventory();
  };
  render() {
    const { listOutlet, listInventory } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });
    const listAllInventory = listInventory.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.stock}</td>
          <td>{item.unit}</td>
          <td>{item.unit_price}</td>
          <td>{item.status}</td>
          <td>
            <div class="dropdown">
              <img
                className="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                src={icon}
                alt="icon-edit"
              />

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link class="dropdown-item" to="/product/edit">
                  Edit
                </Link>
                <Link class="dropdown-item">Hapus</Link>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Inventaris" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Link
              to="/product/add"
              className="btn btn-tambah"
              data-toggle="modal"
              data-target="#addInventory"
            >
              Tambah
            </Link>
            <ModalAddInventory />
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
              <h1>Status</h1>
              <select
                className="custom-select col-12 "
                id="statusInventory"
                name="statusInventory"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Hampir Habis">Hampir Habis</option>
              </select>
            </div>
            <div className="col-4 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameInventory"
                name="nameInventory"
                onChange={e => this.handleInputFilter(e)}
                placeholder="Cari Bahan"
              />
            </div>
          </form>
          <div className="col-12 box-content">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Bahan</th>
                  <th scope="col">Stok</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Harga/Unit</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{listAllInventory}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listOutlet, statusInventory, nameInventory, outlet, listInventory, outlet",
  actions
)(withRouter(InventoryPage));
