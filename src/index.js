import dva from 'dva';
import React from "react";
import { BrowserRouter as BR } from "dva/router";
import router from './router.jsx'
import appModel from './models/app.js';

const app = dva({history: BR});

app.model(appModel);

app.router(router);

app.start('#root');