import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component {
  render() {
    return (<nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">All React</a>
        </div>

        <div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/trending">Github Trending</Link></li>
          </ul>
        </div>
      </div>
    </nav>)
  }
}
