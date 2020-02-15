import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/product.css";

import Header from "../components/Header";
import Loader from "../components/Loader";

class CustomerPage extends React.Component {
  state = {
    finishChecking: false
  };

  componentDidMount = async () => {
    await this.props.checkLoginStatus();
    this.setState({ finishChecking: true });
    this.props.getCustomer();
    store.setState({ nameCustomer: "" });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getCustomer();
  };
  render() {
    const { listCustomer, isLoadingCustomer } = this.props;
    const listAllCustomer = listCustomer.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.fullname}</td>
          <td>{item.email}</td>
          <td>{item.phone_number}</td>
          <td>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={() => this.props.deleteCustomerById(item.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </td>
        </tr>
      );
    });

    if (!this.state.finishChecking) {
      return <Loader height="100vh" scale="3" />;
    }
    if (!this.props.isLogin) {
      return <Redirect to="/login" />;
    }
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
            {isLoadingCustomer ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">No. Telepon</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{listAllCustomer}</tbody>
              </table>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "isLogin, isOwner, listCustomer, customerTotal, customerLoyal, customerNew, isLoadingCustomer",
  actions
)(withRouter(CustomerPage));
