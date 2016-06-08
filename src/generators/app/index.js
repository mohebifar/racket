import path from 'path';
import BaseGenerator from '../base-generator';
import prompts from './prompts';
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
        this.filters = {};
        this.init();
        
        this.config.set('generatorVersion', this.rootGeneratorVersion());
        this.config.set('appName', this.appName);
      },
      info: function () {
        this.log(this.yoWelcome);
        this.log('Creating a universal react app had never been so easy!\n');
      }
    };
  }

  get prompting() {
    return {
      appConfigure: function () {
        const done = this.async();

        this.prompt(prompts, answers => {
          Object.keys(answers).forEach(key => {
            this[key] = answers[key];
          });

          this.filters.reduxSaga = answers.reduxAsyncActions === 'redux-saga';
          this.filters.reduxThunk = answers.reduxAsyncActions === 'redux-thunk';
          this.filters[answers.styling] = true;

          done();
        });
      }
    };
  }

  get configuring() {
    return {
      saveSettings: function () {
        this.config.set('filters', this.filters);
      }
    }
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
          skipInstall: this.options['skip-install'],
          bower: false
        });
      }
    };
  }

  get end() {
    return {};
  }
}

module.exports = Generator;