import path from 'path';
import BaseGenerator from '../base-generator';

class Generator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.argument('name', { type: String, required: true });

    this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });
  }

  get initializing() {
    return {
      init: function () {
        this.init();
      }
    };
  }

  get prompting() {
    return {
      appConfigure: function () {
        const done = this.async();

        this.prompt(this.getPrompts(), ({ path }) => {
          this.path = path;

          done();
        });
      }
    };
  }

  get writing() {
    return {
      generateComponent: function () {
        const componentType = this.options.stateless ? 'Stateless' : 'Base';

        // Create the component
        this.fs.copyTpl(
          this.templatePath(`component/${componentType}.js`),
          this.destinationPath(path.join('src', this.path, this.name + '.js')),
          this
        );

        // Create the style sheet
        this.fs.copyTpl(
          this.templatePath(`style/component.css`),
          this.destinationPath(path.join('src', this.path, this.name + this.styleSuffix)),
          this
        );

        // Create the test file
        this.fs.copyTpl(
          this.templatePath(`test/Component-test.js`),
          this.destinationPath(path.join('test', this.path, this.name + '-test.js')),
          this
        );
      }
    };
  }

  getPrompts() {
    return [
      {
        type: 'input',
        name: 'path',
        message: 'Where should I put the component and its styles?',
        default: this.options.path || `components/${this.name}`
      }
    ];
  }
}

module.exports = Generator;