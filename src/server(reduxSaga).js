import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import express from 'express';
import Html from 'components/Html/Html';
import ApiClient from 'helpers/ApiClient';
import { port, staticPath } from 'config';
import createStore from 'redux/create';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from './routes';

function renderPage({ renderProps, store, res, client }) {
  loadOnServer({ ...renderProps, store, helpers: { client } })
    .then(() => {
      const component = (
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
      );

      res.status(200);

      store
        .rootTask
        .done
        .then(() => {
          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html
              assets={webpackIsomorphicTools.assets()}
              component={component}
              store={store}
            />));
        })
        .catch(() => {
          res.status(500).send('Error while fetching data');
        });

      store.close();
    })
    .catch(err => {
      console.error(err.stack);
    });
}

const app = express();

app.use(bodyParser.json());
app.use(express.static(staticPath));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient();
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(client, memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: getRoutes(store), location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500);
      } else if (renderProps) {
        renderPage({ renderProps, store, res, client });
      } else {
        res.status(404).send('Not found');
      }
    });
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`App started listening on port ${port}`);
  }
});
