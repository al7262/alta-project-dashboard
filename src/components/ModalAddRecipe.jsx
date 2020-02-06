import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";

class ModalAddInventory extends React.Component {
  componentDidMount = () => {
    this.props.getInventory();
  };
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { listInventory } = this.props;
    const listAllInventory = listInventory.map(item => {
      return <option value={item.name} />;
    });
    return (
      <React.Fragment>
        <div
          class="modal fade"
          id="tambah-bahan"
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
                    <label
                      className="col-sm-3 col-form-label"
                      for="nameInventory"
                    >
                      Bahan
                    </label>
                    <div className="col-sm-8">
                      <input
                        list="nameInventory"
                        name="nameInventory"
                        className="custom-select custom-select-md"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                      <datalist id="nameInventory">{listAllInventory}</datalist>
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-3" for="amount">
                      Kuantitas
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-3 col-form-label" for="unit">
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
                  <button
                    type="submit"
                    data-dismiss="modal"
                    className="btn btn-simpan"
                    onClick={this.props.addRecipe}
                  >
                    Tambah{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect("listInventory", actions)(withRouter(ModalAddInventory));
