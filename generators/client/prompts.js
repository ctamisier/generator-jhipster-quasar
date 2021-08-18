module.exports = {
    askForClient,
};

function askForClient(meta) {
    if (!meta && this.existingProject) return;
    const applicationType = this.applicationType;

    const choices = [
        {
            value: 'quasar',
            name: 'Quasar',
        },
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientFramework',
        when: () => applicationType !== 'microservice' && applicationType !== 'uaa',
        message: () => 'Which *Framework* would you like to use for the client?',
        choices,
        default: 'quasar',
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientFramework = prompt.clientFramework;
        done();
    });
}
