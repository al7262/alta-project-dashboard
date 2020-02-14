import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import logo from "../images/logo-dark.svg";
import "../styles/postregister.css";
import ImagePicker from "react-file-picker";
class PostRegister extends React.Component {
  componentDidMount = () => {
    this.props.getProvince();
  };

  // sendImage = async event => {
  //   // await store.setState({ fileName: event });
  //   console.log("cek image", event);
  // };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  handleInputImages = async e => {
    await store.setState({ nameFile: e.target.files[0] });
    console.log("cek inpit", this.props.nameFile);
  };
  handleProvince = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getCity();
  };
  handleCity = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getDistrict();
  };
  handleForm = async e => {
    e.preventDefault();
    this.props.postRegister();
    this.props.addOutlet();
    this.props.history.push("/");
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
        <div className="container">
          <form
            action=""
            onSubmit={e => this.handleForm(e)}
            className="form-row box-form mx-auto mt-5 mb-5"
          >
            <div className="col-md-6 col-12 ">
              <div className="box-inside">
                <h1>INFORMASI AKUN</h1>
                <div className="form-group">
                  <label for="fullName">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="personalPhone">Nomor Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    id="personalPhone"
                    name="personalPhone"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="nameBusiness">Nama Bisnis</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameBusiness"
                    name="nameBusiness"
                    onChange={e => this.handleInputFilter(e)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">Logo</label>
                  <input
                    type="file"
                    class="form-control-file"
                    name="fileName"
                    onChange={this.handleInputImages}
                  />
                </div>
                {/* <div>
                  <React.Fragment>
                    <ImagePicker
                      extensions={["jpg", "jpeg", "png"]}
                      dims={{
                        minWidth: 10,
                        maxWidth: 5000,
                        minHeight: 10,
                        maxHeight: 5000
                      }}
                      onChange={base64EncodedString =>
                        this.sendImage(base64EncodedString)
                      }
                      onError={errMsg => console.log(errMsg)}
                    >
                      <button>Click to upload image</button>
                    </ImagePicker>
                  </React.Fragment>
                </div> */}
              </div>

              <div className="logo mt-5">
                <img src={logo} alt="application-logo" />
                <h1>EasyKachin'</h1>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="box-inside">
                <h1>INFORMASI OUTLET</h1>
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
              <button className="btn btn-register" type="submit">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "nameFile, listProvince, listCity, listDistrict,fullName, personalPhone , nameBusiness, nameOutletInput, inputProvince, inputCity, district, address, tax, phoneNumber, urlFirebase",
  actions
)(withRouter(PostRegister));
