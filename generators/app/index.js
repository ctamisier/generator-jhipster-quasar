const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');

const blueprintPackageJson = require('../../package.json');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { ...opts, fromBlueprint: true, skipClient: false });

        this.blueprintjs = blueprintPackageJson;

        this.blueish = chalk.hex('#00b4ff');
        this.blueishBold = this.blueish.bold;
    }

    get initializing() {
        const initPhaseFromJHipster = this._initializing();

        return {
            ...initPhaseFromJHipster,
            displayLogo() {
                this.log('\n');
                this.log(this.blueish('      ██╗ ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗'));
                this.log(this.blueish('      ██║ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗'));
                this.log(this.blueish('      ██║ ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝'));
                this.log(this.blueish('██╗   ██║ ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║'));
                this.log(this.blueish('╚██████╔╝ ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗'));
                this.log(this.blueish(' ╚═════╝  ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝'));
                this.log(
                    `https://github.com/ctamisier/generator-jhipster-quasar ${chalk.bold('JHipster Quasar')} ${this.blueishBold(
                        this.blueprintjs.version
                    )}`
                );
                this.log('\n');
            },
        };
    }

    get prompting() {
        return {
            ...super._prompting(),
            askForApplicationType() {
                if (this.existingProject) return;
                this.applicationType = this.jhipsterConfig.applicationType = 'monolith';
                this.info(`Application type set to ${this.blueishBold('monolith')}`);
            },
            askI18n() {
                if (this.existingProject) return;
                this.enableTranslation = this.jhipsterConfig.enableTranslation = true;
            },
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
