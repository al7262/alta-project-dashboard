import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";

class CustomerPage extends React.Component {
  componentDidMount = () => {
    this.props.getCustomer();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getCustomer();
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
        <Header pageLocation="Pelanggan" />
        <div className="container mt-5">
          <div className="col-12 box-customer row mb-3 ">
            <div className="col-4 text-center">
              <h1>TOTAL PELANGGAN</h1>
              <h2>{this.props.customerTotal}</h2>
            </div>
            <div className="col-4 text-center">
              <h1>PELANGGAN PALING LOYAL</h1>
              <h2>{this.props.customerLoyal}</h2>
            </div>
            <div className="col-4 text-center">
              <h1>PELANGGAN BARU BULAN INI</h1>
              <h2>{this.props.customerNew}</h2>
            </div>
          </div>
          <form className="col-12 box-filter form-row">
            <div className="col-12 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameCustomer"
                name="nameCustomer"
                onChange={e => this.handleInputFilter(e)}
                placeholder="Nama/Email/Telepon"
              />
            </div>
          </form>
          <div className="col-12 box-content mb-5">
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
export default connect(
  "listCustomer, customerTotal, customerLoyal, customerNew",
  actions
)(withRouter(CustomerPage));
