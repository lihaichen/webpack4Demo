import dva from 'dva';
import { BrowserRouter as router } from "dva/router";

import App from './app.jsx'

const app = dva({history: router});

app.router(App);

app.start('#root');