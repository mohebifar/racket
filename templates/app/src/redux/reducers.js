import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
import githubHottest from './modules/githubHottest';

export default combineReducers({
  githubHottest,
  reduxAsyncConnect,
  routing: routerReducer,
  form: formReducer
});
