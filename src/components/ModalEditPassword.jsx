import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/modal.css";

class ModalEditPassword extends React.Component {
  handleInput = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <div
          class="modal fade"
          id="editPassword"
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
                  UBAH PASSWORD
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
                    <label className="col-sm-4" for="password">
                      Password Lama
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="newPassword">
                      Password Baru
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        onChange={e => this.handleInput(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row text-left">
                    <label className="col-sm-4" for="confirmNewPassword">
                      Konfirmasi Password Baru
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
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
                      onClick={this.props.editPassword}
                    >
                      Simpan{" "}
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
  "password, newPassword, confirmNewPassword",
  actions
)(withRouter(ModalEditPassword));
