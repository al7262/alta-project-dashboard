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
import { CSVLink, CSVDownload } from "react-csv";

import Header from "../components/Header";
import Loader from "../components/Loader";
import Button from "../components/Button";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class ReportProductPage extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
    this.props.getCategory();
    this.props.getReportProduct();
    store.setState({
      idOutlet: "",
      category: "",
      nameProduct: "",
      start_time: "",
      end_time: ""
    });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getReportProduct();
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
    this.props.getReportProduct();
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
    const {
      isLoadingReport,
      listCategory,
      listOutlet,
      listReportProduct
    } = this.props;
    const listAllCategory = listCategory.map(item => {
      return <option value={item}>{item}</option>;
    });
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });
    const listAllReport = listReportProduct.map((item, key) => {
      return (
        <tr className={item.deleted ? "table-danger" : ""}>
          <th scope="row">{key + 1}</th>
          <td>{item.name}</td>
          <td>{item.category}</td>
          <td>{item.total_sold}</td>
          <td>{formatMoney(item.total_sales, "Rp", 2, ".", ",")}</td>
        </tr>
      );
    });
    let startDate = this.state.dateRangePicker.selection.startDate;
    let endDate = this.state.dateRangePicker.selection.endDate;
    let csvData = [
      [],
      ["", "Laporan Penjualan Produk"],
      [
        "",
        "Tanggal: " +
          startDate.getUTCDate() +
          "/" +
          (startDate.getUTCMonth() + 1) +
          "/" +
          startDate.getUTCFullYear() +
          " - " +
          endDate.getUTCDate() +
          "/" +
          (endDate.getUTCMonth() + 1) +
          "/" +
          endDate.getUTCFullYear()
      ],
      [],
      ["", "No", "Produk", "Kategori", "Terjual", "Total"]
    ];
    for (let index = 1; index <= listReportProduct.length; index++) {
      csvData.push([
        "",
        index,
        listReportProduct[index - 1].name,
        listReportProduct[index - 1].category,
        listReportProduct[index - 1].total_sold,
        listReportProduct[index - 1].total_sales
      ]);
    }

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
              <h1>Kategori</h1>
              <select
                className="custom-select col-12 "
                id="category"
                name="category"
                onChange={e => this.handleInputFilter(e)}
              >
                <option value="">Semua Kategori</option>
                {listAllCategory}
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
                id="nameProduct"
                name="nameProduct"
                placeholder="Cari Produk"
                onChange={e => this.handleInputFilter(e)}
              />
            </div>
          </form>
          <div className="col-12 row ml-0 p-0">
            <div className="col-2 box-button">
              <CSVLink
                data={csvData}
                filename={"Laporan_Produk.csv"}
                className="btn btn-success btn-block mb-5"
              >
                Download
              </CSVLink>
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
                    <div className="col-6 text-center">
                      <h1>TOTAL TERJUAL</h1>
                      <h2>{this.props.totalSoldProduct}</h2>
                    </div>
                    <div className="col-6 text-center">
                      <h1>TOTAL PENDAPATAN</h1>
                      <h2>
                        {" "}
                        {formatMoney(
                          this.props.totalSalesProduct,
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
                        <th scope="col">Produk</th>
                        <th scope="col">Kategori</th>
                        <th scope="col">Terjual</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAllReport}
                      <tr>
                        <th scope="row"></th>
                        <th scope="row">Grand Total</th>
                        <th scope="row"></th>
                        <th scope="row">{this.props.totalSoldProduct}</th>
                        <th scope="row">
                          {formatMoney(
                            this.props.totalSalesProduct,
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
  "listOutlet, listCategory, listReportProduct, totalSalesProduct, totalSoldProduct, isLoadingReport, idOutlet, category, nameProduct, start_time, end_time",
  actions
)(withRouter(ReportProductPage));
