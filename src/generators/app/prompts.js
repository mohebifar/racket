export default [
  {
    type: 'list',
    name: 'reduxAsyncActions',
    message: 'What would you prefer for async actions?',
    choices: ['redux-saga', 'redux-thunk']
  },
  {
    type: 'list',
    name: 'styling',
    message: 'What would you prefer for styling?',
    choices: ['sass', 'less', 'postcss', 'css']
  }
];