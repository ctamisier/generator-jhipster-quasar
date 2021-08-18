const chalk = require('chalk');

module.exports = {
    askForApplicationType,
};

async function askForApplicationType() {
    if (this.existingProject) return;

    const answers = await this.prompt([
        {
            type: 'list',
            name: 'applicationType',
            message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
            choices: [
                {
                    value: 'monolith',
                    name: 'Monolithic application',
                },
            ],
            default: 'monolith',
        },
    ]);

    this.applicationType = this.jhipsterConfig.applicationType = answers.applicationType;
}
