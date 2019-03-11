import dva from 'dva';
import React from 'react'
import './index.less';
import {browserHistory} from 'dva/router';
import Router from './router';

const app = dva({
  history: browserHistory
});

app.router(Router);

app.start('#root');