var webpack = require('webpack');
var path = require('path');

var a = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    singleRun: !!process.env.CI,
    frameworks: ['mocha'],
    files: [
      './node_modules/babel-polyfill/lib/index.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/**/*.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240}},
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          {test: /\.json$/, loader: 'json-loader'},
          {test: /\.css/, loader: 'style!css'},
          {test: /\.less$/, loader: 'style!css!less'},
          {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
          }
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],
    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true
  })
};
module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader')
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240}},
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          {test: /\.json$/, loader: 'json-loader'},
          {test: /\.css/, loader: 'style!css'},
          {test: /\.less$/, loader: 'style!css!less'},
          {test: /\.scss$/, loader: 'style!css!sass'}
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        // new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ],
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};