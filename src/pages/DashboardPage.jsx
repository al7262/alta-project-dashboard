import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "../styles/dashboard.css";
import { LineChart, ColumnChart, PieChart } from "react-chartkick";
import "chart.js";
import { formatMoney } from "accounting";

import Header from "../components/Header";
import Loader from "../components/Loader";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class Dashboard extends React.Component {
  state = {
    finishChecking: false
  }

  componentDidMount = async () => {
    await this.props.checkLoginStatus()
    this.setState({finishChecking:true})
    this.props.getOutlet();
    this.props.getDashboard();
    store.setState({ outlet: "", start_time: "", end_time: "" });
  };

  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getDashboard();
  };
  handleRangeChange = async (which, payload) => {
    console.log(which, payload);
    await this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
    store.setState({
      start_time: formatDateDisplay(
        this.state.dateRangePicker.selection.startDate
      ),
      end_time: formatDateDisplay(this.state.dateRangePicker.selection.endDate)
    });
    this.props.getDashboard();
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      }
    };
  }

  render() {
    const { listOutlet, isLoadingDashboard, listReminder } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.name}>{item.name}</option>;
    });
    const listAllReminder = listReminder.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.stock}</td>
          <td>{item.outlet}</td>
        </tr>
      );
    });

    if(!this.state.finishChecking){
      return <Loader
        height='100vh'
        scale='3'/>
    }
    if(!this.props.isLogin){
      return <Redirect to="/login"/>

    }
    return (
      <React.Fragment>
        <Header pageLocation="Dashboard" />
        <div className="container mb-5">
          <form className="col-12 box-filter form-row mt-5">
            <div className="col-6 form-group">
              <div>
                <h1>Outlet</h1>
                <select
                  className="custom-select col-12 "
                  id="outlet"
                  name="outlet"
                  onChange={e => this.handleInputFilter(e)}
                >
                  <option value="">Semua Outlet</option>
                  {listAllOutlet}
                </select>
              </div>
            </div>
            <div className="col-6 form-group">
              <h1>Tanggal</h1>
              <div
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onToggle="rootClose"
                className="row"
              >
                <div className="col-6 pr-0">
                  <input
                    type="text"
                    className="form-control "
                    name="start_time"
                    // readOnly
                    value={formatDateDisplay(
                      this.state.dateRangePicker.selection.startDate
                    )}
                  />
                </div>
                <div className="col-6 pl-0">
                  <input
                    type="text"
                    className="form-control"
                    name="end_time"
                    // readOnly
                    value={formatDateDisplay(
                      this.state.dateRangePicker.selection.endDate
                    )}
                  />
                </div>
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <DateRangePicker
                  onChange={this.handleRangeChange.bind(
                    this,
                    "dateRangePicker"
                  )}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  className={"PreviewArea"}
                  months={1}
                  maxDate={new Date()}
                  ranges={[this.state.dateRangePicker.selection]}
                  direction="horizontal"
                />
              </div>
            </div>
          </form>
          <div className="col-12 row mt-3 ml-0 p-0">
            <div className="col-6 pl-0">
              <div className="box-dashboard">
                <h1>TOTAL PENJUALAN</h1>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <h2>
                      {formatMoney(this.props.salesAmount, "Rp", 2, ".", ",")}
                    </h2>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="col-6 pr-0">
              <div className="box-dashboard">
                <h1>TOTAL TRANSAKSI</h1>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <h2>{this.props.numberTransaction}</h2>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 box-dashboard mt-3">
            <h1>GRAFIK PENJUALAN</h1>
            {isLoadingDashboard ? (
              <Loader height={"100%"} loading={"hidden"} />
            ) : (
              <React.Fragment>
                <LineChart
                  data={this.props.listChart}
                  xtitle="Waktu"
                  ytitle="Penjualan (Rp)"
                />
              </React.Fragment>
            )}
          </div>
          <div className="col-12 row mt-3 ml-0 p-0">
            <div className="col-6 pl-0  ">
              <div className="box-dashboard pb-2">
                <h1>PENJUALAN PRODUK TERTINGGI</h1>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <ColumnChart
                      data={this.props.listTopProduct}
                      xtitle="Produk"
                      ytitle="Jumlah Transaksi"
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="col-6 pr-0 ">
              <div className="box-dashboard pb-2">
                <h1>PENJUALAN KATEGORI TERTINGGI</h1>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <PieChart data={this.props.listTopCategory} />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 row mt-3 ml-0 p-0">
            <div className="col-6 pl-0">
              <div className="box-totalCustomer">
                <div className="col-12">
                  <h1>PELANGGAN</h1>
                </div>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <div className="row h-75">
                    <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                      <div className="d-flex justify-content-center align-items-center">
                        <i className="material-icons mr-2" style={{fontSize:"72px"}}>person_add</i>
                        <h1 style={{fontSize: "52px", color:"black"}}>{this.props.customerNew}</h1>
                      </div>
                      <h1 style={{fontSize: "20px", color:"black"}}>Pelanggan Baru</h1>
                      {/* <h2>{this.props.customerNew}</h2> */}
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                      <div className="d-flex justify-content-center align-items-center">
                        <i className="material-icons mr-2" style={{fontSize:"72px"}}>people_alt</i>
                        <h1 style={{fontSize: "52px", color:"black"}}>{this.props.customerTotal}</h1>
                      </div>
                      <h1 style={{fontSize: "20px", color:"black"}}>Total Pelanggan</h1>
                      {/* <h2>{this.props.customerTotal}</h2> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-6 pr-0">
              <div className="box-stock">
                <h1>PENGINGAT STOK</h1>
                {isLoadingDashboard ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Produk</th>
                          <th scope="col">Stok</th>
                          <th scope="col">Outlet</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{listAllReminder}</tbody>
                    </table>{" "}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  "listOutlet, outlet, start_time, end_time, salesAmount, numberTransaction, belowReminder, listChart,listTopProduct,listTopCategory,listReminder, isLoadingDashboard, customerNew, customerTotal, isLogin, isOwner",
  actions
)(withRouter(Dashboard));
