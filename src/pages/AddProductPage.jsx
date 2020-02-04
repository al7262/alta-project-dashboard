import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import "../styles/addproduct.css";

import Header from "../components/Header";
import Button from "../components/Button";

class AddProduct extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header pageLocation="Produk" />
        <div className="container">
          <form
            action=""
            onSubmit={e => e.preventDefault()}
            className="form-row box-addproduct mx-auto"
          >
            <div className="col-md-6">
              <div className="col-12 box-content-add ">
                <div className="box-inside-add">
                  <h1>INFORMASI PRODUK</h1>
                  <div className="form-group">
                    <label for="nama-produk">Nama Produk</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nama-produk"
                      name="nama-produk"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="kategori">Kategori</label>
                    <input
                      list="kategori"
                      name="kategori"
                      className="custom-select custom-select-md"
                    />
                    <datalist id="kategori">
                      <option value="Makanan" />
                      <option value="Minuman" />
                    </datalist>
                  </div>
                  <div className="form-group">
                    <label for="harga">Harga</label>
                    <input
                      type="text"
                      className="form-control"
                      id="harga"
                      name="harga"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="foto">Foto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="foto"
                      name="foto"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <legend for="status-dijual">Status Dijual</legend>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status-dijual"
                        id="status-dijual1"
                        value="Ya"
                        checked
                      />
                      <label className="form-check-label" for="status-dijual1">
                        Ya
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status-dijual"
                        id="status-dijual2"
                        value="Tidak"
                      />
                      <label className="form-check-label" for="status-dijual2">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-12 box-content-add ">
                <div className="box-inside-add">
                  <h1>RESEP</h1>
                  <div className="col-12 box-table">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Bahan</th>
                          <th scope="col">Kuantitas</th>
                          <th scope="col">Unit</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                  <div className="col-12 text-center pt-2 pr-0">
                    <Button buttoncontent={"Tambah Bahan"} />
                  </div>
                  <div className="col-12 text-center  pr-0">
                    <Button buttoncontent={"Batal"} direction={"/product"} />
                    <Button buttoncontent={"Simpan"} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default connect("", actions)(withRouter(AddProduct));
