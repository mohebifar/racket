import React, { Component } from 'react';
import styles from './<%= name %><%= styleSuffix %>';

export default class <%= name %> extends Component {
  render() {
    return <div className={styles.container}>This is <%= name %>!</div>;
  }
}
