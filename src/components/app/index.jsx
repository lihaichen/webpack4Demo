import React, { Component } from "react";
import { connect } from "dva";
import { Route, Switch } from "dva/router";

import NotFind from "../404/index.jsx";

const prefixCls = "App";

@connect(state => ({ app: state.app }))
export default class App extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    console.log(this.props.app.toJS());
  }
  render() {
    return (
      <div className={`${prefixCls}`}>
        <p>hello app</p>
        <Switch>
          <Route component={NotFind} />
        </Switch>
      </div>
    );
  }
}
