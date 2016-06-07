import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import sagas from './sagas';

export default function create(client, data) {
  let middleware;

  const sagaMiddleware = createSagaMiddleware();
  if (__DEVELOPMENT__) {
    middleware = compose(
      applyMiddleware(sagaMiddleware),
      __CLIENT__ &&
      typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() :
        f => f
    );
  } else {
    middleware = applyMiddleware(sagaMiddleware);
  }

  const store = createStore(reducers, data, middleware);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  store.rootTask = sagaMiddleware.run(sagas, client);
  store.close = () => store.dispatch(END);

  return store;
}
