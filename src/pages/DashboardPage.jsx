import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";
// import { DateRangePicker } from "rsuite";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import Header from "../components/Header";

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "DD/MM/YYYY");
}
class Dashboard extends React.Component {
  componentDidMount = () => {
    this.props.getOutlet();
  };
  handleInputFilter = e => {
    store.setState({ [e.target.name]: e.target.value });
  };
  handleRangeChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: "selection"
        }
      }
    };
  }

  render() {
    const { listOutlet } = this.props;
    const listAllOutlet = listOutlet.map(item => {
      return <option value={item.name}>{item.name}</option>;
    });

    return (
      <React.Fragment>
        <Header pageLocation="Dashboard" />
        <div className="container">
          <form className="col-12 box-filter form-row mt-5">
            <div className="col-6 form-group">
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
                <input
                  type="text"
                  className="form-control col-6"
                  readOnly
                  value={formatDateDisplay(
                    this.state.dateRangePicker.selection.startDate
                  )}
                />
                <input
                  type="text"
                  class="form-control col-6"
                  readOnly
                  value={formatDateDisplay(
                    this.state.dateRangePicker.selection.endDate
                  )}
                />
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
        </div>
      </React.Fragment>
    );
  }
}
export default connect("listOutlet, outlet", actions)(withRouter(Dashboard));
