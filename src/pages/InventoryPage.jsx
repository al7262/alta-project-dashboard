import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";
import Button from "../components/Button";

class InventoryPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
  };
  render() {
    const { listOutlet } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.name}>{item.name}</option>;
    });
    return (
      <React.Fragment>
        <Header pageLocation="Produk" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Button buttoncontent={"Tambah"} direction={"/product/add"} />
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-6 form-group">
              <h1>Outlet</h1>
              <select
                className="custom-select col-12 "
                id="outlet"
                name="outlet"
              >
                {listAllOutlet}
              </select>
            </div>
            <div className="col-6 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="cari-produk"
                name="cari-produk"
                placeholder="Cari Produk"
              />
            </div>
          </form>
          <div className="col-12 box-content">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Produk</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">Status</th>
                  <th scope="col">Harga</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listOutlet, listCategory",
  actions
)(withRouter(InventoryPage));
