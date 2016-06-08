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

- [react](https://github.com/facebook/react)
- **Side effects**: [redux-thunk](https://github.com/gaearon/redux-thunk), [redux-saga](https://github.com/yelouafi/redux-saga)
- **Styling**: sass, less, postcss, css, radium (soon)
- [webpack](https://webpack.github.io/) + [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- [redux](https://github.com/reactjs/redux), [redux-connect](https://github.com/makeomatic/redux-connect)
- [react-router](https://github.com/reactjs/react-router), [react-router-redux](https://github.com/reactjs/react-router-redux)
- **Testing**
  - [enzyme](https://github.com/airbnb/enzyme)
  - [mocha](https://github.com/mochajs/mocha)
  - [karma](https://github.com/karma-runner/karma)



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
