import BaseGenerator from '../base-generator';

const importIdentifier = '} from \'./containers\'';
const routeIdentifier = '{ /* Add routes below */ }';

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

  get configuring() {
    return {
      createComponent: function () {
        this.composeWith('racket:component', {
          options: {
            path: `containers/${this.name}`
          },
          args: [this.name]
        });
      }
    };
  }

  get prompting() {
    return {
      appConfigure: function () {
        const done = this.async();

        this.prompt(this.getPrompts(), ({ route }) => {
          this.route = route;

          done();
        });
      }
    };
  }

  get writing() {
    return {
      generateComponent() {
        const routeFile = this.destinationPath('src/routes.js');
        const containers = this.destinationPath('src/containers/index.js');
        const route = this.route.replace(/^\//, '');

        this.fs.copy(routeFile, routeFile, {
          process: content => {
            let newString = content.toString();

            const importString = `, ${this.name}`;
            const routeString = `<Route path="${route}" component={${this.name}}/>`;

            if (!newString.includes(importString)) {
              newString = newString.replace(
                importIdentifier, importString + ' ' + importIdentifier
              );
            }

            if (!newString.includes(routeString)) {
              newString = newString.replace(
                routeIdentifier, routeIdentifier + '\n    ' + routeString
              );
            }

            return newString;
          }
        });

        this.fs.copy(containers, containers, {
          process: content => {
            let newString = content.toString().replace(/\s+$/, '');

            const importString = `import ${this.name} from './${this.name}/${this.name}';`;

            if (!newString.includes(importString)) {
              newString += '\n' + importString + '\n'
            }

            return newString;
          }
        });
      }
    };
  }

  getPrompts() {
    return [
      {
        type: 'input',
        name: 'route',
        message: 'What will the url of your route be?',
        default: '/' + this.name.toLowerCase()
      }
    ];
  }
}

module.exports = Generator;