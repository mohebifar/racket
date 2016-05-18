import fetch from 'isomorphic-fetch';
import {put, call} from 'redux-saga/effects';

export const LOAD = 'app/trendingRepos/LOAD';
export const LOAD_SUCCESS = 'app/trendingRepos/LOAD_SUCCESS';
export const LOAD_FAIL = 'app/trendingRepos/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        loaded: false,
        loading: true,
        data: []
      };
    case LOAD_SUCCESS:
      return {
        loaded: true,
        loading: false,
        data: action.data
      };
    case LOAD_FAIL:
      return {
        loaded: false,
        loading: false
      };
    default:
      return state;
  }
}

export function load() {
  return {
    type: LOAD
  };
}

export function loadFail() {
  return {
    type: LOAD_FAIL
  };
}

export function loadSuccess(data) {
  return {
    type: LOAD_SUCCESS,
    data
  };
}

export function *loadSaga() {
  try {
    const data = yield fetch(
      'https://api.github.com/search/repositories?' +
      ['q=created:>2016-01-01', 'sort=stars', 'order=desc'].join('&')
    ).then(r => r.json());

    yield put(loadSuccess(data.items));

  } catch (error) {
    yield put(loadFail(error));
  }
}
