import React from 'react';
import { connect } from 'dva';
import { Route, Switch } from 'dva/router';

// import PropTypes from 'prop-types';

import NotFind from '../404';

const prefixCls = 'App';

@connect(state => ({ app: state.app }))
export default class App extends React.Component {
  componentWillMount() {
    const { app } = this.props;
    console.log(app.toJS());
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
