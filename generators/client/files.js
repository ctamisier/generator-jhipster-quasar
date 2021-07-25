const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const QUASAR_PATH = 'quasar';

module.exports = {
    writeFiles,
    addLanguages,
    addLanguagesInQuasarConf,
    addForwardOnRoot,
    addYarnVersion,
    replaceNpmByYarn,
    addSwagger,
    addWebappBuildPackageJson
};

function writeFiles() {
    const files = {
        root: [
            {
                templates: [
                    `${QUASAR_PATH}/.editorconfig`,
                    `${QUASAR_PATH}/.eslintignore`,
                    `${QUASAR_PATH}/.eslintrc.js`,
                    `${QUASAR_PATH}/.gitignore`,
                    `${QUASAR_PATH}/.postcssrc.js`,
                    `${QUASAR_PATH}/babel.config.js`,
                    `${QUASAR_PATH}/jsconfig.json`,
                    `${QUASAR_PATH}/package.json`,
                    `${QUASAR_PATH}/README.md`
                ]
            }
        ],
        vscode: [
            {
                templates: [`${QUASAR_PATH}/.vscode/extensions.json`, `${QUASAR_PATH}/.vscode/settings.json`]
            }
        ],
        src: [
            {
                templates: [`${QUASAR_PATH}/src/App.vue`]
            }
        ],
        srcboot: [
            {
                templates: [`${QUASAR_PATH}/src/boot/axios.js`, `${QUASAR_PATH}/src/boot/i18n.js`]
            }
        ],
        srccss: [
            {
                templates: [`${QUASAR_PATH}/src/css/app.scss`, `${QUASAR_PATH}/src/css/quasar.variables.scss`]
            }
        ],
        srclayout: [
            {
                templates: [`${QUASAR_PATH}/src/layouts/MainLayout.vue`]
            }
        ],
        srcpages: [
            {
                condition: generator => generator.authenticationType !== 'oauth2',
                templates: [
                    `${QUASAR_PATH}/src/pages/Account.vue`,
                    `${QUASAR_PATH}/src/pages/Activation.vue`,
                    `${QUASAR_PATH}/src/pages/ChangePassword.vue`,
                    `${QUASAR_PATH}/src/pages/ForgotPassword.vue`,
                    `${QUASAR_PATH}/src/pages/Register.vue`,
                    `${QUASAR_PATH}/src/pages/ResetPassword.vue`,
                    `${QUASAR_PATH}/src/pages/User.vue`,
                    `${QUASAR_PATH}/src/pages/Users.vue`
                ]
            },
            {
                templates: [
                    `${QUASAR_PATH}/src/pages/Configuration.vue`,
                    `${QUASAR_PATH}/src/pages/Docs.vue`,
                    `${QUASAR_PATH}/src/pages/Error404.vue`,
                    `${QUASAR_PATH}/src/pages/Health.vue`,
                    {
                        file: () => `${QUASAR_PATH}/src/pages/_${this.authenticationType}/Index.vue`,
                        renameTo: () => `${QUASAR_PATH}/src/pages/Index.vue`
                    },
                    `${QUASAR_PATH}/src/pages/Logs.vue`,
                    `${QUASAR_PATH}/src/pages/Metrics.vue`
                ]
            }
        ],
        srcrouter: [
            {
                templates: [`${QUASAR_PATH}/src/router/index.js`, `${QUASAR_PATH}/src/router/entityRoutes.js`]
            }
        ],
        srcstore: [{ templates: [`${QUASAR_PATH}/src/store/index.js`, `${QUASAR_PATH}/src/store/store-flag.d.ts`] }],
        srcstoreauth: [
            {
                templates: [
                    {
                        file: () => `${QUASAR_PATH}/src/store/auth/_${this.authenticationType}/actions.js`,
                        renameTo: () => `${QUASAR_PATH}/src/store/auth/actions.js`
                    },
                    `${QUASAR_PATH}/src/store/auth/getters.js`,
                    `${QUASAR_PATH}/src/store/auth/index.js`,
                    `${QUASAR_PATH}/src/store/auth/mutations.js`,
                    `${QUASAR_PATH}/src/store/auth/state.js`
                ]
            }
        ],
        srcutil: [
            {
                templates: [`${QUASAR_PATH}/src/util/format.js`]
            }
        ]
    };

    this.writeFilesToDisk(files, '.');

    this.copy(`${QUASAR_PATH}/public`, `${QUASAR_PATH}/public`);
    this.copy(`${QUASAR_PATH}/src/index.template.html`, `${QUASAR_PATH}/src/index.template.html`);
    this.copy(`${QUASAR_PATH}/src/constants/i18nConstants.js`, `${QUASAR_PATH}/src/constants/i18nConstants.js`);
    this.copy(`${QUASAR_PATH}/src/assets/jhipster.svg`, `${QUASAR_PATH}/src/assets/jhipster.svg`);
    this.copy(`${QUASAR_PATH}/src/assets/quasar-logo-vertical.svg`, `${QUASAR_PATH}/src/assets/quasar-logo-vertical.svg`);
    this.copy(`${QUASAR_PATH}/src/assets/quasar-logo-vertical-dark.svg`, `${QUASAR_PATH}/src/assets/quasar-logo-vertical-dark.svg`);
    this.copy(`${QUASAR_PATH}/quasar.conf.js`, `${QUASAR_PATH}/quasar.conf.js`);
    this.copy(`${QUASAR_PATH}/src/auth/_${this.authenticationType}/authentication.js`, `${QUASAR_PATH}/src/auth/authentication.js`);
}

function addLanguages() {
    const i18nMapping = {
        en: { localeId: 'enUS', localeImport: 'en-US', quasarLang: 'en-US' },
        al: { localeId: 'sq', localeImport: 'sq', quasarLang: '' },
        'ar-ly': { localeId: 'arDZ', localeImport: 'ar-DZ', quasarLang: 'ar' },
        by: { localeId: 'be', localeImport: 'be', quasarLang: '' },
        fa: { localeId: 'faIR', localeImport: 'fa-IR', quasarLang: 'fa-IR' },
        in: { localeId: 'id', localeImport: 'id', quasarLang: '' },
        ko: { localeId: 'ko', localeImport: 'ko', quasarLang: 'ko-KR' },
        mr: { localeId: '', localeImport: '', quasarLang: '' },
        my: { localeId: '', localeImport: '', quasarLang: '' },
        'pt-br': { localeId: 'ptBR', localeImport: 'pt-BR', quasarLang: 'pt-BR' },
        'pt-pt': { localeId: 'pt', localeImport: 'pt', quasarLang: 'pt' },
        si: { localeId: '', localeImport: '', quasarLang: '' },
        ua: { localeId: 'uk', localeImport: 'uk', quasarLang: 'uk' },
        'uz-Cyrl-uz': { localeId: '', localeImport: '', quasarLang: '' },
        'uz-Latn-uz': { localeId: 'uz', localeImport: 'uz', quasarLang: '' },
        'zh-cn': { localeId: 'zhCN', localeImport: 'zh-CN', quasarLang: 'zh-CN' },
        'zh-tw': { localeId: 'zhTW', localeImport: 'zh-TW', quasarLang: 'zh-TW' }
    };

    const datefnsMapping = Object.keys(i18nMapping)
        .filter(key => this.languages.includes(key))
        .map(key => `'${key}': '${i18nMapping[key].localeId}'`)
        .join(', ');

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const datefnsMapping =[\s\S]+?};/,
        `export const datefnsMapping = { ${datefnsMapping} };`
    );

    const quasarLangMapping = Object.keys(i18nMapping)
        .filter(key => this.languages.includes(key))
        .map(key => `'${key}': '${i18nMapping[key].quasarLang}'`)
        .join(', ');

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const quasarLangMapping =[\s\S]+?};/,
        `export const quasarLangMapping = { ${quasarLangMapping} };`
    );

    const imports = this.languages
        .filter(language => !i18nMapping[language] || i18nMapping[language].localeId)
        .map(language => {
            const mapping = i18nMapping[language] || { localeId: language, localeImport: language };
            return `case '${mapping.localeId}': return require('date-fns/locale/${mapping.localeImport}');`;
        })
        .join('\n');

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const importLocale =[\s\S]+?};/,
        `export const importLocale = () => { switch (window.__localeId__) { ${imports} default: return require('date-fns/locale/en-US');}};`
    );

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const languages =[\s\S]+?\]/,
        `export const languages = {${this.languages
            .map(language => `'${language}': '${jhipsterConstants.LANGUAGES.find(lang => lang.value === language).dispName}'`)
            .join(',')}}`
    );
}

function addLanguagesInQuasarConf() {
    const i18nMergeEntries = this.languages
        .map(language => `{ pattern: '../src/main/webapp/i18n/${language}/*.json', fileName: '../i18n/${language}.json' }`)
        .join(',');

    this.replaceContent(`${QUASAR_PATH}/quasar.conf.js`, /groupBy: \[[\s\S]+?\]/, `groupBy: [ ${i18nMergeEntries} ]`);
}

function addForwardOnRoot() {
    this.replaceContent(
        `${jhipsterConstants.SERVER_MAIN_SRC_DIR}${this.packageFolder}/web/rest/ClientForwardController.java`,
        'public class ClientForwardController {',
        `public class ClientForwardController {
         @GetMapping(value = "/")
         public String forwardRoot() {
              return "forward:/${QUASAR_PATH}/index.html";
         }`
    );
}

function addYarnVersion() {
    this.replaceContent(
        'pom.xml',
        /<npm.version>(.*)<\/npm.version>/,
        `<npm.version>$1</npm.version>
        <yarn.version>v1.22.10</yarn.version>`
    );
}

function replaceNpmByYarn() {
    this.replaceContent(
        'pom.xml',
        /<plugin>[\s]*<groupId>com.github.eirslett<\/groupId>[\s]*<artifactId>frontend-maven-plugin<\/artifactId>[\s]*<executions>[\s\S]+?<\/plugin>/g,
        `<plugin>
                        <groupId>com.github.eirslett</groupId>
                        <artifactId>frontend-maven-plugin</artifactId>
                        <configuration>
                            <workingDirectory>quasar</workingDirectory>
                            <nodeVersion>\${node.version}</nodeVersion>
                            <yarnVersion>\${yarn.version}</yarnVersion>
                        </configuration>
                        <executions>
                            <execution>
                                <id>install node and npm for quasar</id>
                                <goals>
                                    <goal>install-node-and-npm</goal>
                                </goals>
                            </execution>
                            <execution>
                                <id>install node and yarn for quasar</id>
                                <goals>
                                    <goal>install-node-and-yarn</goal>
                                </goals>
                            </execution>
                            <execution>
                                <id>quasar install</id>
                                <goals>
                                    <goal>yarn</goal>
                                </goals>
                                <configuration>
                                    <arguments>install</arguments>
                                </configuration>
                            </execution>
                            <execution>
                                <id>quasar build</id>
                                <goals>
                                    <goal>yarn</goal>
                                </goals>
                                <configuration>
                                    <arguments>build</arguments>
                                </configuration>
                            </execution>
                        </executions>
                    </plugin>`
    );
}

function addSwagger() {
    const { CLIENT_MAIN_SRC_DIR } = jhipsterConstants;

    const files = {
        swagger: [
            {
                path: CLIENT_MAIN_SRC_DIR,
                templates: ['swagger-ui/index.html', { file: 'swagger-ui/dist/images/throbber.gif', method: 'copy' }]
            }
        ]
    };
    return this.writeFilesToDisk(files, 'common');
}

function addWebappBuildPackageJson() {
    this.replaceContent('package.json', '"scripts": {', '  "scripts": {\n  "webapp:build": "",\n');
}
