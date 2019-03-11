import {IndexRoute, Route, Router} from 'dva/router';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NotFind from './components/404/index.jsx'

const APP = (props) => {
  return <h1>hello world! </h1>;
}

export default ({history}) => {
    return(
    <Router history = {history}>
    <div>
        <Route exact path = '/' component={APP}/>
        <Route path = '*' component = {NotFind} />
    </div>
    </Router>
    );
}
