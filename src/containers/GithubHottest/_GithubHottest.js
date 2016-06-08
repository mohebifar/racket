import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { load } from 'redux/modules/githubHottest';
import RepositoryInfo from 'components/Github/RepositoryInfo';
import Helmet from 'react-helmet';<% if (filters.sass || filters.postcss) { %>
import styles from './GithubHottest.scss';<% } %><% if (filters.less) { %>
import styles from './GithubHottest.less';<% } %><% if (filters.css) { %>
import styles from './GithubHottest.css';<% } %>

@asyncConnect([
  {
    promise: ({ store }) => {
      if (!store.getState().githubHottest.loaded) {
        return store.dispatch(load());
      }
      return null;
    }
  }
])
@connect(state => ({
  repositories: state.githubHottest.data,
  loading: state.githubHottest.loading,
  loaded: state.githubHottest.loaded
}))
export default class GithubHottest extends Component {
  static propTypes = {
    repositories: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  };

  render() {
    const { loading, loaded, repositories } = this.props;

    return (<div className={styles.wrapper}>
      <div className="container">
        <Helmet title="Github Trending"/>
        {
          loading ? <span>Please wait while loading the data from Github API...</span> : null
        }
        {
          loaded ? repositories.map(repo => <RepositoryInfo key={repo.id} repo={repo}/>) : null
        }
      </div>
    </div>);
  }
}
