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
        <p>404</p>
      </div>);
  }
}
