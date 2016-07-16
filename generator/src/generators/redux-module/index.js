import BaseGenerator from '../base-generator';

const importIdentifier = '// Import reducers below';
const reducerIdentifier = '// Add reducers below';

class Generator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.argument('name', { type: String, required: true });
  }

  get initializing() {
    return {
      init: function () {
        this.init();
      }
    };
  }

  get writing() {
    return {
      generateComponent: function () {
        const reducersFile = this.destinationPath('src/redux/reducers.js');

        this.fs.copy(reducersFile, reducersFile, {
          process: content => {
            let newString = content.toString();

            const importString = `import ${this.name} from './modules/${this.name}';`;
            const reducerString = `${this.name},`;

            if (!newString.includes(importString)) {
              newString = newString.replace(
                importIdentifier, importIdentifier + '\n' + importString
              );
            }

            if (!newString.includes(reducerString)) {
              newString = newString.replace(
                reducerIdentifier, reducerIdentifier + '\n  ' + reducerString
              );
            }

            return newString;
          }
        });

        this.fs.copyTpl(
          this.templatePath(`redux-module/module.js`),
          this.destinationPath(`src/redux/modules/${this.name}.js`),
          this
        );
      }
    };
  }
}

module.exports = Generator;
