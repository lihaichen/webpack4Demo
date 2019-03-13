import { Component } from 'react';
import './index.less';

const prefixCls = 'NotFind';

export default class NotFind extends Component {
  render() {
    return (
      <div className={`${prefixCls}`}>
        <p>{404}</p>
      </div>
    );
  }
}
