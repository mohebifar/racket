import path from 'path';
import BaseGenerator from '../base-generator';
import prompts from './prompts';
let baseRootPath;

if (process.env.TEMPLATE_PATH) {
  baseRootPath = process.env.TEMPLATE_PATH;
} else {
  baseRootPath = path.join(path.dirname(require.resolve('racket-template')), '..');
}

console.log(baseRootPath);

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

          this.filters[answers.styling] = true;
          this.filters.reduxSaga = answers.reduxAsyncActions === 'redux-saga';
          this.filters.reduxThunk = answers.reduxAsyncActions === 'redux-thunk';
          this.filters.bootstrap = answers.bootstrap;
          this.filters.reactBootstrap = answers.reactBootstrap;
          this.filters.reduxForm = answers.reduxForm;

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
          'LICENSE',
          '.gitignore',
          'static/.gitignore'
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