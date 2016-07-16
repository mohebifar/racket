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
  },
  {
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Bootstrap?',
    when: answers => answers.styling === 'sass'
  },
  {
    type: 'confirm',
    name: 'reactBootstrap',
    message: 'Would you like to include React Bootstrap?',
    when: answers => answers.bootstrap
  },
  {
    type: 'confirm',
    name: 'reduxForm',
    message: 'Would you like to include Redux Form?'
  }
];