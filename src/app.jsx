import './index.less';
import { Route, Switch } from "dva/router";
import React from "react";
import NotFind from "./components/404/index.jsx";

const APP = props => {
  return <p>hello world!</p>;
};

export default ({ history: Router }) => {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <Switch>
          <Route path="/" exact component={APP} />
          <Route component={NotFind} />
        </Switch>
      </div>
    </Router>
  );
};
