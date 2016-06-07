import { put } from 'redux-saga/effects';

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
        loading: false,
        error: action.error
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

export function loadFail(error) {
  return {
    type: LOAD_FAIL,
    error
  };
}

export function loadSuccess(data) {
  return {
    type: LOAD_SUCCESS,
    data
  };
}

export function *loadSaga(client) {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 30);

    const data = yield client
      .get(
        '/search/repositories?' +
        ['q=created:>' + date.toISOString(), 'sort=stars', 'order=desc'].join('&')
      );

    yield put(loadSuccess(data.items));
  } catch (error) {
    yield put(loadFail(error));
  }
}
