import React from 'react';
import { connect } from 'dva';
import { Route, Switch, withRouter } from 'dva/router';
// import PropTypes from 'prop-types';

import NotFind from '../404';

const prefixCls = 'App';

@withRouter
@connect(state => ({ app: state.app }))
export default class App extends React.Component {
  componentWillMount() {
    const { app, history, match } = this.props;
    console.log('app==>', app.toJS());
    console.log('history==>', history);
    console.log('match==>', match);
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
