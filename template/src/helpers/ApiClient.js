import { apiPath } from 'config';
import fetch from 'isomorphic-fetch';
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return apiPath + adjustedPath;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then(json => Promise.reject(json));
}

function parseJSON(response) {
  return response.json();
}

function fetchCreator(method) {
  return (url, { data, ...options } = {}) => {
    const fetchOptions = options;
    fetchOptions.headers = fetchOptions.headers || {};
    fetchOptions.headers.Accept = 'application/json';

    if (data) {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    fetchOptions.method = method;

    return fetch(formatUrl(url), fetchOptions)
      .then(checkStatus)
      .then(parseJSON);
  };
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = fetchCreator(method);
    });
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {
  }
}
