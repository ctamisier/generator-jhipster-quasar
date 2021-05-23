import { api } from 'boot/axios';
import { Quasar } from 'quasar';
import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { datefnsMapping, langObjects, quasarLangMapping } from '../constants/i18nConstants';

const i18n = createI18n();

export default boot(({ app }) => {
  app.use(i18n);
});

const defaultLangKey = langObjects[0].key;

const loadTranslation = langKey => {
  api.get(`/i18n/${langKey}.json?cache=${new Date().getTime()}`).then(response => {
    const mapping = datefnsMapping[langKey];
    window.__localeId__ = mapping || langKey;
    i18n.global.locale = langKey;

    const messages = JSON.parse(JSON.stringify(response.data).replaceAll('{{ ', '{').replaceAll(' }}', '}'));
    i18n.global.setLocaleMessage(langKey, messages);

    const quasarLang = quasarLangMapping[langKey] || langKey;
    import(`quasar/lang/${quasarLang}`)
      .then(lang => {
        Quasar.lang.set(lang.default);
      })
      .catch(() => {
        console.log(`Unavailable Quasar Language Pack: ${quasarLang}, fallback to en-US`);
        import('quasar/lang/en-US').then(lang => {
          Quasar.lang.set(lang.default);
        });
      });
  });
};

loadTranslation(defaultLangKey);

export { i18n, loadTranslation };
