import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";

class CustomerPage extends React.Component {
  componentDidMount = () => {
    this.props.handleFilterCustomer();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.handleFilterCustomer();
  };
  render() {
    const { listCustomer } = this.props;
    const listAllCustomer = listCustomer.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.fullname}</td>
          <td>{item.phone_number}</td>
          <td>{item.email}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Inventaris" />
        <div className="container">
          <form className="col-12 box-filter form-row">
            <div className="col-12 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameCustomer"
                name="nameCustomer"
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
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col">No. Telepon</th>
                </tr>
              </thead>
              <tbody>{listAllCustomer}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect("listCustomer", actions)(withRouter(InventoryPage));
