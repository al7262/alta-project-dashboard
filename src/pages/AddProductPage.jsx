import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/addproduct.css";

import Header from "../components/Header";
import Button from "../components/Button";
import ModalAddInventory from "../components/ModalAddRecipe";

class AddProduct extends React.Component {
  componentDidMount = () => {
    this.props.getCategory();
  };
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { listCategory } = this.props;
    const listRecipe = JSON.parse(localStorage.getItem("recipe"));
    const listAllCategory = listCategory.map(item => {
      return <option value={item} />;
    });
    const listAllRecipe = listRecipe.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.unit}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
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
                    <label for="nameProductInput">Nama Produk</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameProductInput"
                      name="nameProductInput"
                      onChange={e => this.handleInput(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="categoryInput">Kategori</label>
                    <input
                      list="categoryInput"
                      name="categoryInput"
                      className="custom-select custom-select-md"
                      onChange={e => this.handleInput(e)}
                      required
                    />
                    <datalist id="categoryInput">{listAllCategory}</datalist>
                  </div>
                  <div className="form-group">
                    <label for="price">Harga</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={e => this.handleInput(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="imageProduct">Foto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="imageProduct"
                      name="imageProduct"
                      onChange={e => this.handleInput(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <legend for="showProductInput">Status Dijual</legend>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="showProductInput"
                        id="showProductInput1"
                        value="Ya"
                        onChange={e => this.handleInput(e)}
                      />
                      <label className="form-check-label" for="status-dijual1">
                        Ya
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="showProductInput"
                        id="showProductInput2"
                        onChange={e => this.handleInput(e)}
                        value="Tidak"
                      />
                      <label
                        className="form-check-label"
                        for="showProductInput2"
                      >
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
                      <tbody>{listAllRecipe}</tbody>
                    </table>
                  </div>
                  <div className="col-12 text-center pt-2">
                    <Button
                      buttoncontent={"Tambah Bahan"}
                      ismodal={"ya"}
                      modal={"#tambah-bahan"}
                    />
                    <ModalAddInventory />
                  </div>
                  <div className="col-12 text-center ">
                    <Link to="/product" className="btn btn-simpan">
                      Batal
                    </Link>
                    <Link
                      to="/product"
                      className="btn btn-simpan"
                      onClick={this.props.addProduct}
                    >
                      Simpan
                    </Link>
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
export default connect(
  "listRecipe, listCategory, nameProductInput, categoryInput showProductInput, price, imageProduct",
  actions
)(withRouter(AddProduct));