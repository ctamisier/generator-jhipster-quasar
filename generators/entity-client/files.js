const jhipsterUtils = require('generator-jhipster/generators/utils');

const QUASAR_PATH = 'quasar';

module.exports = {
    writeFiles,
    addRoute,
    addMenuEntry,
    addWebappBuildPackageJson
};

function writeFiles() {
    const files = {
        entity: [
            {
                templates: [
                    {
                        file: `${QUASAR_PATH}/entities/Entities.vue`,
                        renameTo: generator =>
                            `${QUASAR_PATH}/src/pages/entities/${generator.entityFolderName}/${generator.entityAngularNamePlural}.vue`
                    },
                    {
                        file: `${QUASAR_PATH}/entities/EntityEdit.vue`,
                        renameTo: generator =>
                            `${QUASAR_PATH}/src/pages/entities/${generator.entityFolderName}/${generator.entityAngularName}Edit.vue`
                    },
                    {
                        file: `${QUASAR_PATH}/entities/routeEntity.js`,
                        renameTo: generator => `${QUASAR_PATH}/src/router/entities/${generator.entityInstance}Routes.js`
                    }
                ]
            }
        ]
    };
    this.writeFilesToDisk(files, '.');
}

function addRoute() {
    const routesIncluded = jhipsterUtils.checkStringInFile(
        `${QUASAR_PATH}/src/router/entityRoutes.js`,
        `${this.entityInstance}Routes`,
        this
    );

    if (routesIncluded) {
        return;
    }

    this.replaceContent(`${QUASAR_PATH}/src/router/entityRoutes.js`, '...[]', `...${this.entityInstance}Routes,...[]`);

    this.replaceContent(
        `${QUASAR_PATH}/src/router/entityRoutes.js`,
        'export const entityRoutes',
        `import { ${this.entityInstance}Routes } from './entities/${this.entityInstance}Routes';\nexport const entityRoutes`
    );
}

function addMenuEntry() {
    // eslint-disable-next-line prettier/prettier
    const entry = `{ to: '/${this.entityApiUrl}', icon: 'auto_awesome', i18nKey: 'global.menu.entities.${this.entityInstance}', enabled: store.getters['auth/hasRoleAdmin'] }`;

    const entryIncluded = jhipsterUtils.checkStringInFile(`${QUASAR_PATH}/src/layouts/MainLayout.vue`, `/${this.entityInstancePlural}`, this);

    if (entryIncluded) {
        return;
    }

    this.replaceContent(`${QUASAR_PATH}/src/layouts/MainLayout.vue`, '...[]', `${entry},\n          ...[]`);
}

function addWebappBuildPackageJson() {
    this.replaceContent('package.json', '"scripts": {', '  "scripts": {\n  "webapp:build": "cd quasar && npx quasar build",\n');
}
