import 'babel-polyfill';
import path from 'path';
import glob from 'glob';
import lodash from 'lodash';
import s from 'underscore.string';
import fs from 'fs';
import { Base } from 'yeoman-generator';

lodash.mixin(s.exports());

function expandFiles(pattern, options = {}) {
  const cwd = options.cwd || process.cwd();
  return glob.sync(pattern, options).filter(filePath => fs.statSync(path.join(cwd, filePath)).isFile());
}

const filterRegex = /\(([a-z0-9]+)\)/i;

export default class BaseGenerator extends Base {
  constructor(...args) {
    super(...args);
  }

  init() {
    const baseDetermineAppname = this.determineAppname.bind(this);

    this.determineAppname = () => {
      return this.name || baseDetermineAppname();
    };

    this.appName = lodash.camelize(
      lodash.slugify(
        lodash.humanize(this.determineAppname())
      )
    );

    this.filters = this.filters || this.config.get('filters');
    if (this.filters.sass || this.filters.postcss) {
      this.styleSuffix = '.scss';
    } else if (this.filters.less) {
      this.styleSuffix = '.less';
    } else if (this.filters.css) {
      this.styleSuffix = '.css';
    }
  }

  getTemplateParams(filePath) {
    return {
      lodash,
      filePath,
      appName: this.appName,
      filters: this.filters
    };
  }

  getFilteredFileName(fileName) {
    if (filterRegex.test(fileName)) {
      return fileName.replace(filterRegex, '');
    } else {
      return null;
    }
  }

  shouldFilteredFileBeIncluded(fileName) {
    const matches = fileName.match(filterRegex);
    return matches && this.filters[matches[1]];
  }

  processDirectory(source, destination, excluded) {
    const root = path.isAbsolute(source) ? source : path.join(this.sourceRoot(), source);
    const files = expandFiles('**', { dot: true, cwd: root });

    files.forEach(name => {
      if (excluded.indexOf(name) !== -1 || /(\.git(?!ignore))|\.idea|node_modules/.test(name)) {
        return;
      }

      const src = path.join(root, name);
      let ignore = false;
      let dest = path.join(destination, name);
      let isTemplate = false;

      if (path.basename(dest).indexOf('_') === 0) {
        const stripped = path.basename(dest).replace(/^_/, '');
        isTemplate = true;
        dest = path.join(path.dirname(dest), stripped);
      }

      const isFiltered = this.getFilteredFileName(path.basename(dest));
      if (isFiltered) {
        if (this.shouldFilteredFileBeIncluded(path.basename(dest))) {
          dest = path.join(path.dirname(dest), isFiltered);
        } else {
          ignore = true;
        }
      }

      if (!ignore) {
        if (isTemplate) {
          this.fs.copyTpl(src, dest, this.getTemplateParams(dest));
        } else {
          this.fs.copy(src, dest);
        }
      }
    });
  }

  templatePath(_path) {
    return path.join(__dirname, '..', 'templates', _path);
  }
}
