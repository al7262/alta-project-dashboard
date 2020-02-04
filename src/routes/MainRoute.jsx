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
          <Route component={NotMatchPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;
