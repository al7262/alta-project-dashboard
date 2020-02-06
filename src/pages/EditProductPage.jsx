import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/addproduct.css";

import Header from "../components/Header";
import Button from "../components/Button";
import ModalAddInventory from "../components/ModalAddRecipe";

class EditProduct extends React.Component {
  componentDidMount = () => {
    this.props.getCategory();
    this.props.getRecipe();
  };
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { listRecipe, listCategory } = this.props;
    const listAllCategory = listCategory.map(item => {
      return <option value={item} />;
    });
    const listAllRecipe = listRecipe.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.unit}</td>
          <td>{item.amount}</td>
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
                    <label for="nameProduct">Nama Produk</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameProduct"
                      name="nameProduct"
                      onChange={e => this.handleInput(e)}
                      value={this.props.nameProduct}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="category">Kategori</label>
                    <input
                      list="category"
                      name="category"
                      className="custom-select custom-select-md"
                      onChange={e => this.handleInput(e)}
                      value={this.props.category}
                      required
                    />
                    <datalist id="category">{listAllCategory}</datalist>
                  </div>
                  <div className="form-group">
                    <label for="price">Harga</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={e => this.handleInput(e)}
                      value={this.props.price}
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
                      value={this.props.imageProduct}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <legend for="showGetProduct">Status Dijual</legend>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="showGetProduct"
                        id="showGetProduct1"
                        value="Ya"
                        onChange={e => this.handleInput(e)}
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
                        name="showGetProduct"
                        id="showGetProduct2"
                        onChange={e => this.handleInput(e)}
                        value="Tidak"
                      />
                      <label className="form-check-label" for="showGetProduct2">
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
                    <Link
                      to="/product"
                      className="btn btn-simpan"
                      onClick={this.props.handleBack}
                    >
                      Batal
                    </Link>
                    <Link
                      to="/product"
                      className="btn btn-simpan"
                      onClick={this.props.editProduct}
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
  "listRecipe, listCategory, nameProduct, category, showProduct, price, imageProduct",
  actions
)(withRouter(EditProduct));
