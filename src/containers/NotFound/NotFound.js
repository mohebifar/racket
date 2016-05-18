import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

export default class NotFound extends Component {
  render() {
    return <div>
      <Helmet title="Not found"/>
      <div className="container">
        <h1>404!</h1>
        <p>
          <span>The page you were looking for was not found :(</span>
        </p>
      </div>
    </div>;
  }
}
