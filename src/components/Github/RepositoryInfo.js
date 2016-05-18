import React, {Component, PropTypes} from 'react';
import styles from './RepositoryInfo.css';

export default class RepositoryInfo extends Component {
  static propTypes = {
    repo: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      language: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      owner: PropTypes.shape({avatar_url: PropTypes.string.isRequired, login: PropTypes.string.isRequired}).isRequired
    }).isRequired
  };

  render() {
    const {repo} = this.props;

    return (
      <div>
        <div className={styles.container}>
          <div className="pull-left">
            <img className={styles.avatar} src={repo.owner.avatar_url} alt="Avatar"/>
          </div>
          <div className="pull-left">
            <div className={styles.title}>
              <h3>
                <a target="_blank" href={repo.git_url}>{repo.full_name}</a>
              </h3>
            </div>
            <div className={styles.info}>
              <span className="language">{repo.language}</span>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
