import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (<html lang="fa-ir">
      <head>
        <meta charSet="utf-8"/>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        {
          Object
            .keys(assets.styles)
            .map((style, i) =>
              <link
                href={assets.styles[style]}
                key={i}
                media="screen, projection"
                rel="stylesheet"
                type="text/css"
                charSet="utf-8"
              />)
        }
      </head>

      <body>

        <div
          id="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <script
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
        />

        {
          Object
            .keys(assets.javascript)
            .map((script, i) => <script src={assets.javascript[script]} key={i}/>)
        }
      </body>
    </html>);
  }
}
