import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "unistore/react";
import { store } from "../stores/MainStore";
import Dashboard from "../pages/DashboardPage";

const Mainroute = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;
