import {takeLatest} from 'redux-saga';
import {LOAD as TRENDING_REPOS_LOAD, loadSaga as loadTrendingSaga} from './modules/trendingRepos';

export default function *rootSaga() {
  yield [
    takeLatest(TRENDING_REPOS_LOAD, loadTrendingSaga)
  ];
}