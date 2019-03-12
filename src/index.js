import dva from 'dva';
import React from "react";
import { BrowserRouter as history } from "dva/router";
import router from './router.jsx'
import appModel from './models/app.js';

const app = dva({history: history});

app.model(appModel);

app.router(router);

app.start('#root');