import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import sagas from './sagas';

export default function create(client, browserHistory, data) {
  let enhancer;
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    routerMiddleware(browserHistory)
  ];

  if (__DEVELOPMENT__) {
    enhancer = compose(
      applyMiddleware(...middleware),
      __CLIENT__ &&
      typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() :
        f => f
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const store = createStore(reducers, data, enhancer);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  store.rootTask = sagaMiddleware.run(sagas, client);
  store.close = () => store.dispatch(END);

  return store;
}
