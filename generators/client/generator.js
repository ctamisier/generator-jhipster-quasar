import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/generators/client';
import {
  writeFiles,
  addLanguages,
  addLanguagesInQuasarConf,
  addForwardOnRoot,
  addMavenCopyResources,
  addGradleTask,
  addSwagger
} from './files.js';

export default class extends ClientGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts });

    const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

    if (!jhContext) {
      this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quasar')}`);
    }

    this.configOptions = jhContext.configOptions || {};

    this.blueish = chalk.hex('#00b4ff');
    this.blueishBold = this.blueish.bold;
  }

  get initializing() {
    return super._initializing();
  }

  get prompting() {
    return {
      overrideConfigOptions() {
        if (this.existingProject) return;
        this.clientFramework = this.jhipsterConfig.clientFramework = 'quasar';
      }
    };
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
      write() {
        writeFiles.call(this);
        addLanguages.call(this);
        addLanguagesInQuasarConf.call(this);
        addForwardOnRoot.call(this);
        addSwagger.call(this);

        if (this.buildTool === 'maven') {
          addMavenCopyResources.call(this);
        } else if (this.buildTool === 'gradle') {
          addGradleTask.call(this);
        }
      },
      updatePackageJson() {
        const packageTemplate = this.fs.read(this.templatePath('package.json'));
        this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(packageTemplate));
      }
    };
  }

  get postWriting() {
    return super._postWriting();
  }

  get end() {
    return {
      end() {
        this.spawnCommand('npm', ['run', 'webapp:build']);

        this.log(chalk.green.bold('\nClient application generated successfully.\n'));
        this.log(chalk.green('Run Quasar:'));
        this.log(chalk.yellow.bold('cd quasar'));
        this.log(chalk.yellow.bold('npx quasar dev\n'));
        this.log(chalk.yellow.bold('Sign in with admin/admin or user/user\n'));
      }
    };
  }
};
