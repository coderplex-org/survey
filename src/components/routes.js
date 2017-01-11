import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Question from './Question';
import Finish from './Finish';
import NotFound from './NotFound';

export default (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/question/:resourceName' component={Question} />
        <Route path='/finish' component={Finish} />
        <Route path='/404' component={NotFound} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
);
