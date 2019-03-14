import './index.less';
import React from 'react';
import { BrowserRouter } from 'dva/router';
import App from './components/App';

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
