import React, {Component} from 'react';
import styles from './Index.scss';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Index extends Component {
  render() {
    return (<div className={styles.wrapper}>
      <Helmet title="A"/>
      <div className={styles.jumbotron}>
        <div className="container">
          <h1>Racket!</h1>
          <p className={styles.description}>
            A Yeoman generator for universal/isomorphic web apps
          </p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=mohebifar&repo=racket&type=star&count=true&size=large"
            style={{border:'none',width:160,height:30}}
          />
        </div>
      </div>

      <div className="aboutRacket">
        <div className="container">
          <h1>What is Racket?</h1>
          <p>
            Racket is a yeoman generator for creating universal/isomorphic web applications.
            One of the pains for developers who want to use React or want to develop universal apps was knowing which
            libraries to choose and how tie them up!
            Racket responds to this issue by giving you the option to choose the tools/technologies that you prefer the
            most and offering a good structure that you can maintain for years!
          </p>
          <h2>Technologies</h2>
          <p>
            From each item with multiple options, you can choose the one you prefer:
          </p>
          <ul>
            <li><strong>UI Library</strong>: react, preact</li>
            <li><strong>Side effects</strong>: redux-thunk, redux-saga</li>
            <li><strong>Styling</strong>: sass, less, PostCSS (soon), Radium (soon)</li>
            <li>Redux</li>
            <li>Webpack</li>
            <li>Enzyme</li>
          </ul>
          <h2>Features</h2>
          <ul>
            <li>
              <strong>Universal/Isomorphic</strong> JavaScript code is a code that can execute both on the client and
              the server. If you want to learn more about it, {' '}
              <a href="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/">
                Read this great post by Spike Brehm
              </a>.
            </li>
            <li>
              <strong>Server-side data loading</strong> using redux-connect. Take a look at <Link to="/hottest">Github
              hottest page</Link>.
            </li>
          </ul>
        </div>
      </div>
    </div>);
  }
}
