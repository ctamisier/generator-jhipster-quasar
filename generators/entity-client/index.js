const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const writeFiles = require('./files').writeFiles;
const addRoute = require('./files').addRoute;
const addMenuEntry = require('./files').addMenuEntry;

module.exports = class extends EntityClientGenerator {
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
            writeAdditionalFile() {
                writeFiles.call(this);
                addRoute.call(this);
                addMenuEntry.call(this);
            }
        };
    }

    get end() {
        return super._end();
    }
};
