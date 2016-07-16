import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import getRoutes from 'routes';

const client = new ApiClient();
const store = createStore(client, browserHistory, window.__data);

const rootEl = document.getElementById('content');
const history = syncHistoryWithStore(browserHistory, store);

const component = (<Router
  render={
      props =>
        <ReduxAsyncConnect
          {...props}
          helpers={{ client }}
          filter={item => !item.deferred}
        />
      }
  history={history}
>
  {getRoutes(store)}
</Router>);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  rootEl
);
