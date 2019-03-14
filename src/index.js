import dva from 'dva';
import { BrowserRouter } from 'dva/router';
import appModel from './models/app';
import router from './router';

const app = dva({ history: BrowserRouter });

app.model(appModel);

app.router(router);

app.start('#root');
