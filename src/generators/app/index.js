import path from 'path';
import BaseGenerator from '../base-generator';
const packageInfo = require('../../package.json');
const baseRootPath = path.join(path.dirname(require.resolve('racket-template')), '..');

class Generator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.argument('name', { type: String, required: false });

    this.option('skip-install', {
      desc: 'Do not install dependencies',
      type: Boolean,
      defaults: false
    });
  }

  get initializing() {
    return {
      init: function () {
        this.config.set('generatorVersion', this.rootGeneratorVersion());
        this.filters = {};
        this.init();
      },
      info: function () {
        this.log(this.yoWelcome);
        this.log('Creating a universal react app had never been so easy!\n');
      }
    };
  }

  get prompting() {
    return {
      redux: function () {
        const done = this.async();
        const prompt = [
          {
            type: 'list',
            name: 'asyncActions',
            message: 'What would you prefer for async actions?',
            choices: ['redux-saga', 'redux-thunk']
          }
        ];

        this.prompt(prompt, ({ asyncActions }) => {
          this.options.reduxAsyncActions = asyncActions;
          if (asyncActions === 'redux-saga') {
            this.filters.reduxSaga = true;
          } else if (asyncActions === 'redux-thunk') {
            this.filters.reduxThunk = true;
          }
          done();
        });
      },
      style: function () {
        const done = this.async();
        const prompt = [
          {
            type: 'list',
            name: 'styling',
            message: 'What would you prefer for styling?',
            choices: ['sass', 'less', 'postcss', 'css']
          }
        ];

        this.prompt(prompt, ({ styling }) => {
          this.options.styling = styling;
          this.filters[styling] = true;
          done();
        });
      }
    };
  }

  get writing() {
    return {
      generateProject: function () {
        const excludedFiles = [
          'package.json',
          '.npmignore',
          'LICENSE'
        ];

        this.sourceRoot(baseRootPath);
        this.destinationRoot();
        this.processDirectory('.', '.', excludedFiles);
      }
    };
  }

  get install() {
    return {
      installDeps: function () {
        this.installDependencies({
          skipInstall: this.options['skip-install']
        });
      }
    };
  }

  get end() {
    return {};
  }
}

module.exports = Generator;