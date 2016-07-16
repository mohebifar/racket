import React from 'react';
import styles from './<%= name %><%= styleSuffix %>';

const <%= name %> = (props) => (
  <div className={styles.container}>This is <%= name %>!</div>;
);

<%= name %>.displayName = '<%= name %>';

export default <%= name %>;
