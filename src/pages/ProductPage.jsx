import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";
import Button from "../components/Button";

class ProductPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getCategory();
    this.props.handleFilterProduct();
  };
  handleInput1 = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.handleFilterProduct();
  };
  render() {
    const { listCategory, listProduct } = this.props;
    const listAllCategory = listCategory.map(item => {
      return <option value={item}>{item}</option>;
    });
    const listAllProduct = listProduct.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.category}</td>
          {item.show ? <td>Ya</td> : <td>Tidak</td>}
          <td>{item.price}</td>
          <td></td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Produk" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Button buttoncontent={"Tambah"} direction={"/product/add"} />
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-4 form-group">
              <h1>Kategori</h1>
              <select
                className="custom-select col-12 "
                id="category"
                name="category"
                onChange={e => this.handleInput1(e)}
              >
                <option value="">Semua Kategori</option>
                {listAllCategory}
              </select>
            </div>
            <div className="col-4 form-group">
              <h1>Status Dijual</h1>
              <select
                className="custom-select col-12 "
                id="showProduct"
                name="showProduct"
                onChange={e => this.handleInput1(e)}
              >
                <option value="">Semua Status</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
            <div className="col-4 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameProduct"
                name="nameProduct"
                placeholder="Cari Produk"
                onChange={e => this.handleInput1(e)}
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
              <tbody>{listAllProduct}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listOutlet, listCategory, listProduct, category, showProduct, nameProduct",
  actions
)(withRouter(ProductPage));
