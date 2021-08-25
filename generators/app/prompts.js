module.exports = {
    askForApplicationType,
};

async function askForApplicationType() {
    if (this.existingProject) return;

    this.info('Application type forced to Monolith');
    this.applicationType = this.jhipsterConfig.applicationType = 'monolith';
}
