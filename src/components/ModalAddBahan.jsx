import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";

class Dashboard extends React.Component {
  render() {
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
                    <label className="col-sm-3 col-form-label" for="bahan">
                      Bahan
                    </label>
                    <div className="col-sm-8">
                      <input
                        list="bahan"
                        name="bahan"
                        className="custom-select custom-select-md"
                        required
                      />
                      <datalist id="bahan">
                        <option value="Gula" />
                        <option value="Air" />
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group row text-left">
                    <label className="col-sm-3" for="foto">
                      Kuantitas
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="foto"
                        name="foto"
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
                        required
                      />
                      <datalist id="unit">
                        <option value="gram" />
                        <option value="ml" />
                        <option value="pcs" />
                      </datalist>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-simpan">
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
export default connect("", actions)(withRouter(Dashboard));
