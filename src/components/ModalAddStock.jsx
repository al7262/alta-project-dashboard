import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/modal.css";

class ModalAddStock extends React.Component {
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <div
          class="modal fade"
          id="addStock"
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
                  TAMBAH STOK
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
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      data-dismiss="modal"
                      className="btn btn-simpan"
                      onClick={() => this.props.addStock(this.props.id)}
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
)(withRouter(ModalAddStock));
