const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const { writeFiles } = require('./files');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends ServerGenerator {
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
        };
    }

    get postWriting() {
        return super._postWriting();
    }

    get end() {
        return super._end();
    }
};
