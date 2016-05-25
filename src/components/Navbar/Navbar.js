import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component {
  render() {
    return (<nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Racket</Link>
        </div>

        <div>
          <ul className="nav navbar-nav">
            <li><Link to="">Home</Link></li>
            <li><Link to="hottest">Hottests on Github</Link></li>
          </ul>
        </div>
      </div>
    </nav>)
  }
}
