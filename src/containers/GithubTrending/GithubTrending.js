import React, {Component, PropTypes} from 'react';
import {asyncConnect} from 'redux-connect';
import {connect} from 'react-redux';
import {load} from 'redux/modules/trendingRepos';
import RepositoryInfo from 'components/Github/RepositoryInfo';

@asyncConnect([
  {
    promise: ({store}) => store.dispatch(load())
  }
])
@connect(state => ({repos: state.trendingRepos.data}))
export default class GithubTrending extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired
  };

  render() {
    const {repos} = this.props;
    return (<div className="container">
      {
        repos.map(repo => <RepositoryInfo key={repo.id} repo={repo}/>)
      }
    </div>);
  }
}
