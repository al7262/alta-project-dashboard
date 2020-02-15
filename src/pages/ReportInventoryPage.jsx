import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "../styles/product.css";

import Header from "../components/Header";
import Loader from "../components/Loader";
import Button from "../components/Button";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class ReportInventoryPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getReportInventory();
    store.setState({
      idOutlet: "",
      type: "",
      nameInventory: "",
      start_time: "",
      end_time: ""
    });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getReportInventory();
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
    this.props.getReportInventory();
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
    const { isLoadingReport, listOutlet, listReportInventory } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });
    const listAllReport = listReportInventory.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.date + " " + item.time}</td>
          <td>{item.outlet}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.unit}</td>
          <td>{item.amount}</td>
          <td>{item.last_stock}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Header pageLocation="Laporan" />
        <div className="container">
          <form className="col-12 box-filter form-row mt-5 mb-3">
            <div className="col-3 form-group">
              <h1>Outlet</h1>
              <select
                className="custom-select col-12 "
                id="idOutlet"
                name="idOutlet"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Outlet</option>
                {listAllOutlet}
              </select>
            </div>
            <div className="col-3 form-group">
              <h1>Tipe</h1>
              <select
                className="custom-select col-12 "
                id="type"
                name="type"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Tipe</option>
                <option value="Masuk">Masuk</option>
                <option value="Keluar">Keluar</option>
              </select>
            </div>
            <div className="col-3 form-group">
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
            <div className="col-3 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameInventory"
                name="nameInventory"
                placeholder="Cari Produk"
                onChange={e => this.handleInputFilter(e)}
              />
            </div>
          </form>
          <div className="col-12 row ml-0 p-0">
            <div className="col-2 box-button">
              <Button buttoncontent={"Produk"} direction={"/report/product"} />
              <Button buttoncontent={"Laba"} direction={"/report/profit"} />
              <Button
                buttoncontent={"Data Transaksi"}
                direction={"/report/transaction"}
              />
              <Button buttoncontent={"Outlet"} direction={"/report/outlet"} />
              <Button
                buttoncontent={"Kategori"}
                direction={"/report/category"}
              />
              <Button
                buttoncontent={"Log Inventaris"}
                direction={"/report/inventory-log"}
              />
            </div>
            <div className="col-10 mb-5 p-0">
              <div className="box-content p-2">
                {isLoadingReport ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Waktu</th>
                        <th scope="col">Outlet</th>
                        <th scope="col">Bahan</th>
                        <th scope="col">Tipe</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Stok Akhir</th>
                      </tr>
                    </thead>
                    <tbody>{listAllReport}</tbody>
                  </table>
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
  "listOutlet,  listReportInventory,  isLoadingReport, idOutlet,  nameInventory, start_time, end_time, type",
  actions
)(withRouter(ReportInventoryPage));
