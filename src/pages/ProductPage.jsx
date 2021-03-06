import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import { formatMoney } from "accounting";
import "../styles/product.css";
import icon from "../images/icon-edit.png";

import Header from "../components/Header";
import Loader from "../components/Loader";

class ProductPage extends React.Component {
  state = {
    finishChecking: false
  }

  componentDidMount = async () => {
    await this.props.checkLoginStatus()
    this.setState({finishChecking:true})
    this.props.getCategory();
    this.props.getProduct();
    await store.setState({
      category: "",
      showProduct: "",
      nameProduct: ""
    });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getProduct();
  };
  render() {
    const { listCategory, listProduct, isLoadingProduct } = this.props;
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
          <td>{formatMoney(item.price, "Rp", 2, ".", ",")}</td>
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
                  to="/product/edit"
                  onClick={() => this.props.getProductById(item.id)}
                >
                  Ubah
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => this.props.deleteProductById(item.id)}
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
    return (
      <React.Fragment>
        <Header pageLocation="Produk" />
        <div className="container">
          <div className="col-12 text-right pt-4 pr-0">
            <Link
              to="/product/add"
              className="btn btn-tambah"
              onClick={this.props.handleBack}
            >
              Tambah
            </Link>
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-4 form-group">
              <h1>Kategori</h1>
              <select
                className="custom-select col-12 "
                id="category"
                name="category"
                onChange={e => this.handleInputFilter(e)}
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
                onChange={e => this.handleInputFilter(e)}
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
                onChange={e => this.handleInputFilter(e)}
              />
            </div>
          </form>
          <div className="col-12 box-content">
            {isLoadingProduct ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
              <table className="table table-sm">
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
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "isLogin, isOwner, listOutlet, listCategory, listProduct, category, showProduct, nameProduct, isLoadingProduct",
  actions
)(withRouter(ProductPage));
