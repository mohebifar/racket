import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Index, GithubHottest, NotFound } from './containers';

export default function getRoutes() {
  return (<Route path="/" component={App}>
    <IndexRoute component={Index}/>
    { /* Add routes below */ }
    <Route path="hottest" component={GithubHottest}/>
    <Route path="*" component={NotFound} status={404}/>
  </Route>);
}
