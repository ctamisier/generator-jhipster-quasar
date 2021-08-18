const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');

const prompts = require('./prompts');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { ...opts, fromBlueprint: true, skipClient: false });

        this.blueprintjs = blueprintPackageJson;
    }

    get initializing() {
        const initPhaseFromJHipster = this._initializing();

        return {
            ...initPhaseFromJHipster,
            displayLogo() {
                this.log('\n');
                const blueish = chalk.hex('#00b4ff');
                const blueishBold = blueish.bold;
                this.log(blueish('      ██╗ ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗'));
                this.log(blueish('      ██║ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗'));
                this.log(blueish('      ██║ ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝'));
                this.log(blueish('██╗   ██║ ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║'));
                this.log(blueish('╚██████╔╝ ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗'));
                this.log(blueish(' ╚═════╝  ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝'));
                this.log(
                    `https://github.com/ctamisier/generator-jhipster-quasar ${chalk.bold('JHipster Quasar')} ${blueishBold(
                        this.blueprintjs.version
                    )}`
                );

                this.log('\n');
            }
        };
    }

    get prompting() {
        return {
            ...super._prompting(),
            askForApplicationType: prompts.askForApplicationType
        };
    }

    get configuring() {
        return super._configuring();
    }

    get composing() {
        return super._composing();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
