import React, { Component, PropTypes } from 'react';<% if (filters.sass || filters.postcss) { %>
import styles from './RepositoryInfo.scss';<% } %><% if (filters.less) { %>
import styles from './RepositoryInfo.less';<% } %><% if (filters.css) { %>
import styles from './RepositoryInfo.css';<% } %>

export default class RepositoryInfo extends Component {
  static propTypes = {
    repo: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      language: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { repo } = this.props;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src={repo.owner.avatar_url} alt="Avatar"/>
          </div>
          <div className={styles.information}>
            <div className={styles.title}>
              <h3>
                <a target="_blank" href={repo.html_url}>{repo.full_name}</a>
              </h3>
            </div>
            <div className={styles.description}>
              {repo.description}
            </div>
            <div className={styles.meta}>
              <span className="language">{repo.language}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
