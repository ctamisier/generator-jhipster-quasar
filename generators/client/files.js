const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const QUASAR_PATH = 'quasar';

module.exports = {
    writeFiles,
    renameToolbarTitle,
    renamePackageJsonNameField,
    addLangKeys,
    addLanguagesInQuasarConf,
    addForwardOnRoot,
    addYarnVersion,
    replaceNpmByYarn,
    addSwagger
};

function writeFiles() {
    this.copy(`${QUASAR_PATH}/*`, QUASAR_PATH);
    this.copy(`${QUASAR_PATH}/.*`, QUASAR_PATH);
    this.copy(`${QUASAR_PATH}/.vscode`, `${QUASAR_PATH}/.vscode`);
    this.copy(`${QUASAR_PATH}/public`, `${QUASAR_PATH}/public`);
    this.copy(`${QUASAR_PATH}/src`, `${QUASAR_PATH}/src`);
}

function renameToolbarTitle() {
    this.replaceContent(
        `${QUASAR_PATH}/src/layouts/MainLayout.vue`,
        /<q-toolbar-title>[\s\S]*<\/q-toolbar-title>/,
        `<q-toolbar-title>\n          ${this.lowercaseBaseName}\n        </q-toolbar-title>`
    );
}

function renamePackageJsonNameField() {
    this.replaceContent(`${QUASAR_PATH}/package.json`, /"name":[\s\S]+?"[\s\S]+?"/, `"name": "${this.lowercaseBaseName}"`);
}

function addLangKeys() {
    const i18nMapping = {
        en: { localeId: 'enUS', localeImport: 'en-US', quasarLang: 'en-US' },
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
        .map(language => {
            const mapping = i18nMapping[language] || { localeId: language, localeImport: language };
            return `case '${mapping.localeId}':\nreturn require('date-fns/locale/${mapping.localeImport}');`;
        })
        .join('\n');

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const importLocale =[\s\S]+?};/,
        `export const importLocale = () => {\nswitch (window.__localeId__) { ${imports} }};`
    );

    this.replaceContent(
        `${QUASAR_PATH}/src/constants/i18nConstants.js`,
        /export const langKeys =[\s\S]+?\]/,
        `export const langKeys = [${this.languages.map(language => `'${language}'`).join(', ')}]`
    );
}

function addLanguagesInQuasarConf() {
    const i18nMergeEntries = this.languages
        .map(language => `                { pattern: '../src/main/webapp/i18n/${language}/*.json', fileName: '../i18n/${language}.json' }`)
        .join(',\n');

    this.replaceContent(`${QUASAR_PATH}/quasar.conf.js`, /groupBy: \[[\s\S]+?\]/, `groupBy: [\n${i18nMergeEntries}\n              ]`);
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
        /<plugin>[\s]*<groupId>com.github.eirslett<\/groupId>[\s]*<artifactId>frontend-maven-plugin<\/artifactId>[\s\S]+?<\/plugin>/g,
        `<plugin>
                    <groupId>com.github.eirslett</groupId>
                    <artifactId>frontend-maven-plugin</artifactId>
                    <version>\${frontend-maven-plugin.version}</version>
                    <executions>
                        <execution>
                            <id>install node and npm for quasar</id>
                            <goals>
                                <goal>install-node-and-npm</goal>
                            </goals>
                            <configuration>
                                <workingDirectory>quasar</workingDirectory>
                                <nodeVersion>\${node.version}</nodeVersion>
                                <npmVersion>\${npm.version}</npmVersion>
                            </configuration>
                        </execution>
                        <execution>
                            <id>install node and yarn for quasar</id>
                            <goals>
                                <goal>install-node-and-yarn</goal>
                            </goals>
                            <configuration>
                                <workingDirectory>quasar</workingDirectory>
                                <nodeVersion>\${node.version}</nodeVersion>
                                <yarnVersion>\${yarn.version}</yarnVersion>
                            </configuration>
                        </execution>
                        <execution>
                            <id>quasar install</id>
                            <goals>
                                <goal>yarn</goal>
                            </goals>
                            <configuration>
                                <workingDirectory>quasar</workingDirectory>
                                <arguments>install</arguments>
                            </configuration>
                        </execution>
                        <execution>
                            <id>quasar build</id>
                            <goals>
                                <goal>yarn</goal>
                            </goals>
                            <configuration>
                                <workingDirectory>quasar</workingDirectory>
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
