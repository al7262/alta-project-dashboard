import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/modal.css";

class ModalAddInventory extends React.Component {
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <div
          class="modal fade"
          id="addInventory"
          data-backdrop="static"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  TAMBAH BAHAN
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form action="" onSubmit={e => e.preventDefault()}>
                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="nameInventoryInput">
                      Bahan
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="nameInventoryInput"
                        name="nameInventoryInput"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="stock">
                      Stok
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="stock"
                        name="stock"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-4 col-form-label" for="unit">
                      Unit
                    </label>
                    <div className="col-sm-8">
                      <input
                        list="unit"
                        name="unit"
                        className="custom-select custom-select-md"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                      <datalist id="unit">
                        <option value="gram" />
                        <option value="ml" />
                        <option value="pcs" />
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="unit_price">
                      Harga
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="unit_price"
                        name="unit_price"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="reminder">
                      Pengingat Stok
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="reminder"
                        name="reminder"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      data-dismiss="modal"
                      className="btn btn-simpan"
                      onClick={this.props.addInventory}
                    >
                      Tambah{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "nameInventoryInput, stock, unit, unit_price, reminder",
  actions
)(withRouter(ModalAddInventory));
