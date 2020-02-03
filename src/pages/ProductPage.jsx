import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";

class ProductPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header pageLocation="Produk" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Link className="btn btn-tambah">Tambah</Link>
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-3 form-group">
              <h1>Outlet</h1>
              <select
                className="custom-select col-12 "
                id="outlet"
                name="outlet"
              >
                <option value="Semua Outlet">Semua Outlet</option>
                <option value="Cabang Malang">Cabang Malang</option>
                <option value="Cabang Surabaya">Cabang Surabaya</option>
              </select>
            </div>
            <div className="col-3 form-group">
              <h1>Kategori</h1>
              <select
                className="custom-select col-12 "
                id="kategori"
                name="kategori"
              >
                <option value="Semua Kategori">Semua Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>
            <div className="col-3 form-group">
              <h1>Status Dijual</h1>
              <select
                className="custom-select col-12 "
                id="status-dijual"
                name="status-dijual"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
            <div className="col-3 form-group">
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
          <div className="col-12 box-content overflow-auto">
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
export default connect("", actions)(withRouter(ProductPage));
