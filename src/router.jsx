import "./index.less";
import { Route, Switch } from "dva/router";
import React from "react";
import App from "./components/app/index.jsx";

export default ({ history: Router }) => {
  return (
    <Router>
      <App />
    </Router>
  );
};
