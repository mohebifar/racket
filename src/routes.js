import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App, NotFound, GithubTrending} from './containers';

export default function getRoutes() {
  return (<Route path="/" component={App}>
    <IndexRoute component={NotFound}/>
    <Route path="trending" component={GithubTrending}/>
    <Route path="*" component={NotFound} status={404}/>
  </Route>);
}
