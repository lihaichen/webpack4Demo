import dva from 'dva';
import { BrowserRouter as history } from 'dva/router';
import appModel from './models/app.js';
import router from './router.jsx';

const app = dva({ history });

app.model(appModel);

app.router(router);

app.start('#root');
