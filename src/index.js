import dva from 'dva';
import React from 'react'
import './index.less';
import {browserHistory} from 'dva/router';

// import React from 'react';
// import ReactDOM from 'react-dom';
// const Index = () => {
//     return <div>Hello React!!!</div>;
//   };
// ReactDOM.render( <Index/>, document.getElementById('root'));

const APP = (props)=>{
  return <h1>hello world!</h1>;
}

const app = dva({
  history: browserHistory
});

app.router(()=><APP/>);

app.start('#root');