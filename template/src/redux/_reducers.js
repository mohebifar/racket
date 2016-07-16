import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';<% if(filters.reduxForm) { %>
import { reducer as formReducer } from 'redux-form';<% } %>
import githubHottest from './modules/githubHottest';
// Import reducers below

export default combineReducers({
  // Add reducers below
  githubHottest,
  reduxAsyncConnect,<% if(filters.reduxForm) { %>
  form: formReducer,<% } %>
  routing: routerReducer
});
