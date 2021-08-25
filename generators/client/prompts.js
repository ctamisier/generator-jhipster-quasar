module.exports = {
    askForClient,
};

async function askForClient(meta) {
    if (!meta && this.existingProject) return;

    this.info('Client framework automatically set to Quasar');
    this.clientFramework = this.jhipsterConfig.clientFramework = 'quasar';
}
