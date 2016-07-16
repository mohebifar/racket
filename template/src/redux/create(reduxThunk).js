import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function create(client, browserHistory, data) {
  let enhancer;

  const middleware = [
    thunk.withExtraArgument(client),
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

  return store;
}
