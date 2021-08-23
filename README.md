# generator-jhipster-quasar

> Quasar for JHipster

[![NPM version][npm-image]][npm-url]

<img src="https://cdn.quasar.dev/logo-v2/svg/logo-horizontal.svg" width="300">
<br />
<img src="https://raw.githubusercontent.com/jhipster/jhipster-artwork/main/logos/JHipster%20RGB-small100x25px.png" width="300">

# Demo

https://jhipster-quasar.herokuapp.com/ (might need to wait a bit before startup)

# Features

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


# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-quasar
```

To update this blueprint:

```bash
npm update -g generator-jhipster-quasar
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-quasar
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-quasar
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprints quasar
```

## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd quasar
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd quasar
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-quasar
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprint quasar

```

# License

Apache-2.0 © [Clément Tamisier]()

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-quasar.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-quasar
