![Racket Logo](https://www.dropbox.com/s/y11z4zz4w8fcb1d/racket-logo.png?dl=1)

# Racket
Racket is a yeoman generator for creating **universal/isomorphic** web applications. One of the pains for developers who want to use React or want to develop universal apps was knowing which libraries to choose and how tie them up! Racket responds to this issue by giving you the option to choose the tools/technologies that you prefer the most and offering a good structure that you can maintain for years!

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
