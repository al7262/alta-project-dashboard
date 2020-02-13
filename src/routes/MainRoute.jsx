import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "unistore/react";
import { store } from "../stores/MainStore";
import Dashboard from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotMatchPage from "../pages/NotMatchPage";
import RegisterPage from "../pages/RegisterPage";
import PostRegisterPage from "../pages/PostRegisterPage";
import ProductPage from "../pages/ProductPage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import InventoryPage from "../pages/InventoryPage";
import CustomerPage from "../pages/CustomerPage";
import OutletPage from "../pages/OutletPage";
import EmployeePage from "../pages/EmployeePage";
import AddOutletPage from "../pages/AddOutletPage";
import EditOutletPage from "../pages/EditOutletPage";
import AddEmployeePage from "../pages/AddEmployeePage";
import EditEmployeePage from "../pages/EditEmployeePage";
import ReportProductPage from "../pages/ReportProductPage";
import ReportProfitPage from "../pages/ReportProfitPage";
import ReportCategoryPage from "../pages/ReportCategoryPage";
import ReportHistoryTransactionPage from "../pages/ReportHistoryPage";
import ReportInventoryPage from "../pages/ReportInventoryPage";
import ReportOutletPage from "../pages/ReportOutletPage";

const Mainroute = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/postregister" component={PostRegisterPage} />
          <Route exact path="/product" component={ProductPage} />
          <Route exact path="/product/add" component={AddProductPage} />
          <Route exact path="/product/edit" component={EditProductPage} />
          <Route exact path="/inventory" component={InventoryPage} />
          <Route exact path="/customer" component={CustomerPage} />
          <Route exact path="/outlet" component={OutletPage} />
          <Route exact path="/outlet/add" component={AddOutletPage} />
          <Route exact path="/outlet/edit" component={EditOutletPage} />
          <Route exact path="/employee" component={EmployeePage} />
          <Route exact path="/employee/add" component={AddEmployeePage} />
          <Route exact path="/employee/edit" component={EditEmployeePage} />
          <Route exact path="/report/product" component={ReportProductPage} />
          <Route exact path="/report/profit" component={ReportProfitPage} />
          <Route exact path="/report/category" component={ReportCategoryPage} />
          <Route exact path="/report/outlet" component={ReportOutletPage} />
          <Route
            exact
            path="/report/inventory-log"
            component={ReportInventoryPage}
          />
          <Route
            exact
            path="/report/transaction"
            component={ReportHistoryTransactionPage}
          />

          <Route component={NotMatchPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;
