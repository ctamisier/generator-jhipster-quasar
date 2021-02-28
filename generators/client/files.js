const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    writeFiles,
    addLangKeys,
    addLanguagesInQuasarConf,
    addForwardOnRoot,
    addCorsI18N,
    addYarnVersion,
    replaceNpmByYarn
};

function writeFiles() {
    this.copy('quasar', 'quasar');
    this.copy('quasar/.*', 'quasar');
    this.copy('quasar/.vscode', 'quasar/.vscode');
}

function addLangKeys() {
    this.replaceContent(
        'quasar/src/constants/langKeys.js',
        /export const langKeys = [\s\S]+?\]/,
        `export const langKeys = [${this.languages.map(l => `'${l}'`).join(', ')}]`
    );
}

function addLanguagesInQuasarConf() {
    const i18nMergeEntries = this.languages
        .map(language => `                { pattern: '../src/main/webapp/i18n/${language}/*.json', fileName: '../i18n/${language}.json' }`)
        .join(',\n');

    this.replaceContent('quasar/quasar.conf.js', /groupBy: \[[\s\S]+?\]/, `groupBy: [\n${i18nMergeEntries}\n              ]`);
}

function addForwardOnRoot() {
    const packagePath = this.configOptions.packageName.replace(/\./g, '/');
    this.replaceContent(
        `${jhipsterConstants.SERVER_MAIN_SRC_DIR}${packagePath}/web/rest/ClientForwardController.java`,
        'public class ClientForwardController {',
        `
public class ClientForwardController {

    @GetMapping(value = "/")
    public String forwardRoot() {
        return "forward:/quasar/index.html";
    }`
    );
}

function addCorsI18N() {
    const packagePath = this.configOptions.packageName.replace(/\./g, '/');
    this.replaceContent(
        `${jhipsterConstants.SERVER_MAIN_SRC_DIR}${packagePath}/config/WebConfigurer.java`,
        'source.registerCorsConfiguration("/api/**", config)',
        `source.registerCorsConfiguration("/i18n/**", config);
            source.registerCorsConfiguration("/api/**", config);`
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
