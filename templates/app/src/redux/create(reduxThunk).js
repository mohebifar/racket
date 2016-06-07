import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function create(client, data) {
  let middleware;

  const thunkMiddleware = thunk.withExtraArgument(client);

  if (__DEVELOPMENT__) {
    middleware = compose(
      applyMiddleware(thunkMiddleware),
      __CLIENT__ &&
      typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() :
        f => f
    );
  } else {
    middleware = applyMiddleware(thunkMiddleware);
  }

  const store = createStore(reducers, data, middleware);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
