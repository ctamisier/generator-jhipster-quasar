const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const writeFiles = require('./files').writeFiles;
const addLanguages = require('./files').addLanguages;
const addLanguagesInQuasarConf = require('./files').addLanguagesInQuasarConf;
const addForwardOnRoot = require('./files').addForwardOnRoot;
const addMavenCopyResources = require('./files').addMavenCopyResources;
const addGradleTask = require('./files').addGradleTask;
const addSwagger = require('./files').addSwagger;

module.exports = class extends ClientGenerator {
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
            },
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
            },
        };
    }
};
