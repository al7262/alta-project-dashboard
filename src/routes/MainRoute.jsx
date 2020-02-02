import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "unistore/react";
import { store } from "../stores/MainStore";
import Dashboard from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotMatchPage from "../pages/NotMatchPage";
import RegisterPage from "../pages/RegisterPage";

const Mainroute = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={NotMatchPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;
