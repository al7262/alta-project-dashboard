import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "../styles/product.css";
import { formatMoney } from "accounting";

import Header from "../components/Header";
import Loader from "../components/Loader";
import Button from "../components/Button";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class ReportCategoryPage extends React.Component {
  state = {
    finishChecking: false
  }

  componentDidMount = async () => {
    await this.props.checkLoginStatus()
    this.setState({finishChecking:true})
    this.props.getOutlet();
    this.props.getCategory();
    this.props.getReportCategory();
    store.setState({ idOutlet: "", category: "", nameProduct: "" });
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
    this.props.getReportCategory();
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
    this.props.getReportCategory();
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
    const { isLoadingReport, listReportCategory } = this.props;

    const listAllReport = listReportCategory.map((item, key) => {
      return (
        <tr className={item.difference === 0 ? "table-danger" : ""}>
          <th scope="row">{key + 1}</th>
          <td>{item.category}</td>
          <td>{item.total_product}</td>
          <td>{item.total_sold}</td>
          <td>{formatMoney(item.total_sales, "Rp", 2, ".", ",")}</td>
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
        <Header pageLocation="Laporan" />
        <div className="container">
          <form className="col-12 box-filter form-row mt-5 mb-3">
            <div className="col-12 form-group">
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
              <div className="col-12 box-customer row mb-3 mt-3 ">
                {isLoadingReport ? (
                  <Loader height={"100%"} loading={"hidden"} />
                ) : (
                  <React.Fragment>
                    <div className="col-6 text-center">
                      <h1>TOTAL TERJUAL</h1>
                      <h2>{this.props.totalSoldCategory}</h2>
                    </div>
                    <div className="col-6 text-center">
                      <h1>TOTAL PENDAPATAN</h1>
                      <h2>
                        {" "}
                        {formatMoney(
                          this.props.totalSalesCategory,
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
                        <th scope="col">Kategori</th>
                        <th scope="col">Jumlah Produk</th>
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
                        <th scope="row">{this.props.totalSoldCategory}</th>
                        <th scope="row">
                          {formatMoney(
                            this.props.totalSalesCategory,
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
  "isLogin, isOwner, listOutlet, listCategory, listReportCategory, totalSalesCategory, totalSoldCategory, isLoadingReport, idOutlet, category, nameProduct, start_time, end_time",
  actions
)(withRouter(ReportCategoryPage));
