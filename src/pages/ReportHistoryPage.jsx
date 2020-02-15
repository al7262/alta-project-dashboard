import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "../styles/product.css";
import { formatMoney } from "accounting";
import { CSVLink } from "react-csv";

import Header from "../components/Header";
import Loader from "../components/Loader";
import Button from "../components/Button";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class ReportHistoryPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getCategory();
    this.props.getReportHistory();
    store.setState({ idOutlet: "", category: "", nameProduct: "" });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getReportHistory();
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
    this.props.getReportHistory();
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
    const { isLoadingReport, listOutlet, listReportHistory } = this.props;

    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });
    const listAllReport = listReportHistory.map((item, key) => {
      return (
        <tr>
          <th scope="row">{key + 1}</th>
          <td>{item.date_time}</td>
          <td>{item.outlet}</td>
          <td>{item.cashier_name}</td>
          <td>{item.product_name}</td>
          <td>{item.total_items}</td>
          <td>{formatMoney(item.total_sales, "Rp", 2, ".", ",")}</td>
        </tr>
      );
    });

    let startDate = this.state.dateRangePicker.selection.startDate
    let endDate = this.state.dateRangePicker.selection.endDate
    let csvData = [[], ['', 'Laporan Riwayat Transaksi'], ['', 'Tanggal: ' + startDate.getUTCDate() + '/' + (startDate.getUTCMonth() + 1) + '/' + (startDate.getUTCFullYear()) + ' - ' + endDate.getUTCDate() + '/' + (endDate.getUTCMonth() + 1) + '/' + (endDate.getUTCFullYear())], [], ['', 'No', 'Waktu', 'Outlet', 'Kasir', 'Produk', 'Total Item', 'Total Harga']]
    for (let index = 1; index <= listReportHistory.length; index++){
      csvData.push(['', index, listReportHistory[index - 1].date_time, listReportHistory[index - 1].outlet, listReportHistory[index - 1].cashier_name, listReportHistory[index -1].product_name, listReportHistory[index -1].total_items, listReportHistory[index -1].total_sales])
    }

    return (
      <React.Fragment>
        <Header pageLocation="Laporan" />
        <div className="container">
          <form className="col-12 box-filter form-row mt-5 mb-3">
            <div className="col-4 form-group">
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

            <div className="col-4 form-group">
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
            <div className="col-4 form-group">
              <h1>Cari</h1>
              <input
                type="text"
                className="form-control"
                id="nameProduct"
                name="nameProduct"
                placeholder="Cari Produk"
                onChange={e => this.handleInputFilter(e)}
              />
            </div>
          </form>
          <div className="col-12 row ml-0 p-0">
            <div className="col-2 box-button">
            <CSVLink data={csvData} filename={"Laporan_Riwayat_Transaksi.csv"} className="btn btn-success btn-block mb-5">Download</CSVLink>
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
              <div className="col-12 box-customer row mb-3 mt-3 ">
                {isLoadingReport ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <div className="col-4 text-center">
                      <h1>TOTAL TERJUAL</h1>
                      <h2>{this.props.totalSoldHistory}</h2>
                    </div>
                    <div className="col-4 text-center">
                      <h1>TOTAL PENDAPATAN</h1>
                      <h2>
                        {" "}
                        {formatMoney(
                          this.props.totalSalesHistory,
                          "Rp",
                          2,
                          ".",
                          ","
                        )}
                      </h2>
                    </div>
                    <div className="col-4 text-center">
                      <h1>TOTAL PAJAK</h1>
                      <h2>
                        {" "}
                        {formatMoney(
                          this.props.totalTaxHistory,
                          "Rp",
                          2,
                          ".",
                          ","
                        )}
                      </h2>
                    </div>
                  </React.Fragment>
                )}
              </div>
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
                        <th scope="col">Kasir</th>
                        <th scope="col">Produk</th>
                        <th scope="col">Total Item</th>
                        <th scope="col">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAllReport}
                      <tr>
                        <th scope="row"></th>
                        <th scope="row">Grand Total</th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row">{this.props.totalSoldHistory}</th>
                        <th scope="row">
                          {formatMoney(
                            this.props.totalSalesHistory,
                            "Rp",
                            2,
                            ".",
                            ","
                          )}
                        </th>
                      </tr>
                    </tbody>
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
  "listOutlet, listCategory, listReportHistory, totalSalesHistory, totalSoldHistory, isLoadingReport, idOutlet, category, nameProduct, start_time, end_time, totalTaxHistory",
  actions
)(withRouter(ReportHistoryPage));
