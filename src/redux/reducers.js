import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {reducer as formReducer} from 'redux-form';
import test from './modules/test';
import trendingRepos from './modules/trendingRepos';

export default combineReducers({
  test,
  trendingRepos,
  reduxAsyncConnect,
  routing: routerReducer,
  form: formReducer
});
