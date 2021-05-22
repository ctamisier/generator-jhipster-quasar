/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const writeFiles = require('./files').writeFiles;
const renameToolbarTitle = require('./files').renameToolbarTitle;
const renamePackageJsonNameField = require('./files').renamePackageJsonNameField;
const addLangKeys = require('./files').addLangKeys;
const addLanguagesInQuasarConf = require('./files').addLanguagesInQuasarConf;
const addForwardOnRoot = require('./files').addForwardOnRoot;
const addYarnVersion = require('./files').addYarnVersion;
const replaceNpmByYarn = require('./files').replaceNpmByYarn;
const addSwagger = require('./files').addSwagger;
const prompts = require('./prompts');

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quasar')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return {
            askForClient: prompts.askForClient,

            overrideConfigOptions() {
                this.configOptions.clientFramework = this.jhipsterConfig.clientFramework = this.clientFramework = 'quasar';
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
                renameToolbarTitle.call(this);
                renamePackageJsonNameField.call(this);
                addLangKeys.call(this);
                addLanguagesInQuasarConf.call(this);
                addForwardOnRoot.call(this);
                addYarnVersion.call(this);
                replaceNpmByYarn.call(this);
                addSwagger.call(this);
            }
        };
    }

    get end() {
        return {
            end() {
                this.spawnCommand('yarn', ['install'], { cwd: 'quasar' });

                this.log(chalk.green.bold('\nClient application generated successfully.\n'));
                this.log(chalk.green('Run Quasar:'));
                this.log(chalk.yellow.bold('cd quasar'));
                this.log(chalk.yellow.bold('npx quasar dev\n'));
                this.log(chalk.yellow.bold('Sign in with admin/admin or user/user\n'));
            }
        };
    }
};
