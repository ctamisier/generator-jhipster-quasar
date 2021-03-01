/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const writeFiles = require('./files').writeFiles;
const addLangKeys = require('./files').addLangKeys;
const addLanguagesInQuasarConf = require('./files').addLanguagesInQuasarConf;
const addForwardOnRoot = require('./files').addForwardOnRoot;
const addCorsI18N = require('./files').addCorsI18N;
const addYarnVersion = require('./files').addYarnVersion;
const replaceNpmByYarn = require('./files').replaceNpmByYarn;
const prompts = require('./prompts');

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quasar')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return {
            askForClient: prompts.askForClient,

            setSharedConfigOptions() {
                this.configOptions.clientFramework = this.clientFramework;
            }
        };
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return {
            write() {
                writeFiles.call(this);
                addLangKeys.call(this);
                addLanguagesInQuasarConf.call(this);
                addForwardOnRoot.call(this);
                addCorsI18N.call(this);
                addYarnVersion.call(this);
                replaceNpmByYarn.call(this);
            }
        };
    }

    get install() {
        return {
            installing() {
                this.installDependencies({
                    bower: false,
                    npm: false,
                    yarn: { cwd: 'quasar' }
                });
                this.log(chalk.yellow.bold('yarn install --cwd quasar'));
            }
        };
    }

    get end() {
        return {
            end() {
                this.log(chalk.green.bold('\nClient application generated successfully.\n'));
                this.log(chalk.green('Run Quasar:'));
                this.log(chalk.yellow.bold('cd quasar'));
                this.log(chalk.yellow.bold('npx quasar dev\n'));
            }
        };
    }
};