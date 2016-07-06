<p align="center">
  <a href="https://infinite.red/ignite"><img src="https://www.dropbox.com/s/y11z4zz4w8fcb1d/racket-logo.png?dl=1" alt="Racket Logo" width="250px"></a>
</p>

<p align="center">
  Generators, best practices and a complete starting app for developing universal React/Redux web app
  <br/>
  <img src="https://img.shields.io/npm/v/generator-racket.svg?maxAge=2592000" alt="Racket Version"/>
  <img src="https://img.shields.io/npm/dm/generator-racket.svg?maxAge=2592000" alt="Downloads"/>
  <img src="https://img.shields.io/github/license/mohebifar/racket.svg?maxAge=2592000" alt="MIT License"/>
</p>

# Racket
Racket is a yeoman generator for creating **universal/isomorphic** web applications. One of the pains for developers who want to use React or want to develop universal apps was knowing which libraries to choose and how tie them up! Racket responds to this issue by giving you the option to choose the tools/technologies that you prefer the most and offering a good structure that you can maintain for years!

**No need to copy or fork, just use the command-line generator!**

Creating, developing and maintaining a universal react app had never been so easy!

[Live running demo](https://racket-demo.herokuapp.com/)

# Installation
First, note that you need to use npm 3. If you have not upgraded to npm 3, run:
```
npm i -g npm@3
```

Install `yo` and `generator-racket` via npm:

```
npm i -g yo generator-racket
```

Create a directory for your app and cd into it:

```
mkdir my-awesome-app
cd my-awesome-app
```

Then run the following command to start creating your app.

```
yo racket
```

# Features
From each item with multiple options, you can choose the one you prefer:

- UI Library: [React](https://github.com/facebook/react)
- Flux Frameworks: [Redux](https://github.com/reactjs/redux)
  - [Redux Connect](https://github.com/makeomatic/redux-connect) included.
- Async actions: [Redux Thunk](https://github.com/gaearon/redux-thunk), [Redux Saga](https://github.com/yelouafi/redux-saga)
- Stylesheets: Sass, Less, PostCSS, CSS
- CSS Frameworks: [Bootstrap](https://github.com/twbs/bootstrap)
  - Option to include [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- Module Bundler: [Webpack](https://webpack.github.io/) + [Webpack Isomorphic Tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- Rouer: [React Router](https://github.com/reactjs/react-router) + [React Router Redux](https://github.com/reactjs/react-router-redux)
- **Testing**
  - [Enzyme](https://github.com/airbnb/enzyme)
  - [Mocha](https://github.com/mochajs/mocha)
  - [Karma](https://github.com/karma-runner/karma)



# Generators
## Component
To generate a component run:

```
yo racket:component <component-name> [--stateless]
```

## Route
To generate a new route and component run:

```
yo racket:route <component-name>
```

## Redux module
To generate a [redux module](https://github.com/erikras/ducks-modular-redux) run:

```
yo racket:redux-module <name>
```
