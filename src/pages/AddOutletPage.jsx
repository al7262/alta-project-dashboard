import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import "../styles/addoutlet.css";
import Header from "../components/Header";

class AddOutlet extends React.Component {
  componentDidMount = () => {
    this.props.getProvince();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  handleProvince = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getCity();
  };
  handleCity = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getDistrict();
  };
  render() {
    const { listProvince, listCity, listDistrict } = this.props;
    const listAllProvince = listProvince.map(item => {
      return <option value={item.id + "," + item.nama}>{item.nama}</option>;
    });
    const listAllCity = listCity.map(item => {
      return <option value={item.id + "," + item.nama}>{item.nama}</option>;
    });
    const listAllDistrict = listDistrict.map(item => {
      return <option value={item.nama}>{item.nama}</option>;
    });
    return (
      <React.Fragment>
        <Header pageLocation="Outlet" />
        <div className="container ">
          <form
            action=""
            onSubmit={e => e.preventDefault()}
            className="form-row box-form mx-auto mt-5 mb-5"
          >
            <div className="col-12 ">
              <div className="box-inside">
                <div className="col-12 text-center">
                  <h1>TAMBAH OUTLET</h1>
                </div>
                <div className="form-group  ">
                  <label for="nameOutletInput">Nama</label>

                  <input
                    type="text"
                    className="form-control"
                    id="nameOutletInput"
                    name="nameOutletInput"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="inputProvince">Provinsi</label>
                  <select
                    className="custom-select col-12 "
                    id="inputProvince"
                    name="inputProvince"
                    onChange={e => this.handleProvince(e)}
                  >
                    <option value="" disabled selected>
                      Provinsi
                    </option>
                    {listAllProvince}
                  </select>
                </div>
                <div className="form-group">
                  <label for="inputCity">Kota</label>
                  <select
                    className="custom-select col-12 "
                    id="inputCity"
                    name="inputCity"
                    onChange={e => this.handleCity(e)}
                  >
                    <option value="" disabled selected>
                      Kota/Kabupaten
                    </option>
                    {listAllCity}
                  </select>
                </div>
                <div className="form-group">
                  <label for="district">Kecamatan</label>
                  <select
                    className="custom-select col-12 "
                    id="district"
                    name="district"
                    onChange={e => this.handleInputFilter(e)}
                  >
                    <option value="" disabled selected>
                      Kecamatan
                    </option>
                    {listAllDistrict}
                  </select>
                </div>
                <div className="form-group  ">
                  <label for="address">Alamat</label>

                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>

                <div className="form-group  ">
                  <label for="tax">Pajak(%)</label>

                  <input
                    type="text"
                    className="form-control"
                    id="tax"
                    name="tax"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
                <div className="form-group  ">
                  <label for="phoneNumber">No. Telepon</label>

                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <Link to="/outlet" className="btn btn-register mr-2">
                Batal
              </Link>
              <Link
                to="/outlet"
                className="btn btn-register"
                type="submit"
                onClick={this.props.addOutlet}
              >
                Simpan
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listProvince, listCity, listDistrict, nameOutletInput,inputProvince, province,idProvince,inputCity, city,idCity, district, tax, phoneNumber, address",
  actions
)(withRouter(AddOutlet));
