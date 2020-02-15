import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";
import icon from "../images/icon-edit.png";

import Header from "../components/Header";
import ModalAddInventory from "../components/ModalAddInventory";
import ModalEditInventory from "../components/ModalEditInventory";
import ModalAddStock from "../components/ModalAddStock";
import Loader from "../components/Loader";

class InventoryPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getInventory();
    store.setState({ outlet: "", statusInventory: "", nameInventory: "" });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getInventory();
  };
  getId = id => {
    store.setState({ idInventory: id });
  };
  render() {
    const { listOutlet, listInventory, isLoadingInventory } = this.props;
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
          <td>
            Rp. {item.unit_price}/{item.unit}
          </td>
          <td>{item.status}</td>
          {this.props.outlet !== "" ? (
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
                  onClick={() => this.getId(item.id)}
                />

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#addStock"
                  >
                    Tambah Stok
                  </Link>
                  <Link
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#editInventory"
                    onClick={() => this.props.getInventoryById(item.id)}
                  >
                    Ubah
                  </Link>
                  <Link
                    class="dropdown-item"
                    onClick={() => this.props.deleteInventoryById(item.id)}
                  >
                    Hapus
                  </Link>
                </div>
                <ModalEditInventory />
                <ModalAddStock id={item.id} />
              </div>
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Inventaris" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            {this.props.outlet !== "" ? (
              <Link
                className="btn btn-tambah"
                data-toggle="modal"
                data-target="#addInventory"
              >
                Tambah
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-tambah"
                data-toggle="modal"
                data-target="#addInventory"
                disabled
              >
                Tambah
              </button>
            )}
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
            {isLoadingInventory ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
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
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listOutlet, statusInventory, nameInventory, outlet, listInventory, outlet, isLoadingInventory",
  actions
)(withRouter(InventoryPage));
