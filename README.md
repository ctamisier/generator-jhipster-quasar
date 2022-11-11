# generator-jhipster-quasar

> Quasar for JHipster

[![NPM version][npm-image]][npm-url]

<img src="https://cdn.quasar.dev/logo-v2/svg/logo-horizontal.svg" width="300">
<br />
<img src="https://raw.githubusercontent.com/jhipster/jhipster-artwork/main/logos/JHipster%20RGB-small100x25px.png" width="300">

### Features

- JHipster 7 with Quasar v2 (Vue.js 3)
- Users (CRUD)
- Entities (CRUD)
- Configuration
- Health
- Metrics
- Log level
- API Documentation
- Sign in
- Sign up
- Account
- Change password
- Reset password
- JWT / OAuth 2.0 / ~~Session~~
- Maven / Gradle
- i18n
- Dark Mode
![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/cli.png)

|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/home.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/users.png)|
|---|---|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/configuration.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/health.png)|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/metrics.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/loggers.png)|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/apidocs.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/signin.png)|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/signup.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/account.png)|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/changepassword.png)|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/resetpassword.png)|
|![](https://raw.githubusercontent.com/ctamisier/generator-jhipster-quasar-assets/main/screenshots/darkmode.png)||

### Installation

```bash
npm install -g generator-jhipster-quasar
```

### Usage

```bash
mkdir my-app
cd my-app
jhipster-quasar
```

### Run tests

```bash
cd my-app
cd quasar # Cypress is configured in 'quasar' directory (not in root directory)
npx cypress open
```

### Running local Blueprint version for development

```bash
git clone https://github.com/ctamisier/generator-jhipster-quasar
cd generator-jhipster-quasar
npm link
```

```bash
git clone https://github.com/jhipster/generator-jhipster
cd generator-jhipster
npm link
```

```bash
cd generator-jhipster-quasar
npm link generator-jhipster
```

```bash
mkdir my-app
cd my-app
jhipster-quasar
```

### License

Apache-2.0 © [Clément Tamisier]()

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-quasar.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-quasar
