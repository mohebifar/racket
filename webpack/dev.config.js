var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = JSON.parse(babelrc);

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var host = 'localhost';
var port = 8080;

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?' + JSON.stringify(babelLoaderQuery)]
      },
      {
        test: /\.scss$/,
        loader: 'style!css?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]!sass-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]!less-loader'
      },
      {test: /\.css/, loader: 'style!css?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]'},
      {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  },
  postcss: function () {
    return {
      defaults: [require('precss'), require('lost'), require('postcss-color-function')],
      cleaner: []
    };
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};