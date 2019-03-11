import React, {Component} from 'react';
import './index.less';
const prefixCls = 'NotFind';

export default class NotFind extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${prefixCls}`}>
        <h2>404</h2>
      </div>);
  }
}
