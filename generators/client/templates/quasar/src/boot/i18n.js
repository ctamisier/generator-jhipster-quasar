import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { api } from 'boot/axios';
import { langKeys, datefnsMapping } from '../constants/i18nConstants';

const i18n = createI18n();

export default boot(({ app }) => {
  app.use(i18n);
});

const defaultLangKey = langKeys[0];

const loadTranslation = langKey => {
  api.get(`/i18n/${langKey}.json?cache=${new Date().getTime()}`).then(response => {
    const mapping = datefnsMapping[langKey];
    window.__localeId__ = mapping || langKey;
    i18n.global.locale = langKey;

    // TODO maybe use a custom vue-i18n parser
    const messages = JSON.parse(JSON.stringify(response.data).replaceAll('{{ ', '{').replaceAll(' }}', '}'));
    i18n.global.setLocaleMessage(langKey, messages);
  });
};

loadTranslation(defaultLangKey);

export { i18n, loadTranslation };
