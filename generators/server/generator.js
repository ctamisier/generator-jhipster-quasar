import chalk from 'chalk';
import ServerGenerator from 'generator-jhipster/generators/server';
import { writeFiles } from './files.js';

// const blueprintPackageJson = require('../../package.json');

export default class extends ServerGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts });

    const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

    if (!jhContext) {
      this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quasar')}`);
    }

    this.blueprintjs = blueprintPackageJson;
  }

  get initializing() {
    return super._initializing();
  }

  get prompting() {
    return super._prompting();
  }

  get configuring() {
    return super._configuring();
  }

  get composing() {
    return super._composing();
  }

  get loading() {
    return super._loading();
  }

  get preparing() {
    return super._preparing();
  }

  get default() {
    return super._default();
  }

  get writing() {
    return {
      ...super._writing(),
      writeAdditionalFile() {
        writeFiles.call(this);
      },
      updatePackageJson() {
        const packageTemplate = this.fs.read(this.templatePath('package.json'));
        this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(packageTemplate));
      }
    };
  }

  get postWriting() {
    return {
      ...super._postWriting()
    };
  }

  get end() {
    return super._end();
  }
};
