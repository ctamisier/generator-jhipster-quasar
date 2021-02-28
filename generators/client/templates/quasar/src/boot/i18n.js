import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { api } from 'boot/axios'
import { langKeys } from '../constants/langKeys'

const i18n = createI18n()

export default boot(({ app }) => {
  app.use(i18n)
})

const defaultLanguage = langKeys[0]

const loadLanguage = (language) => {
  api.get(`/i18n/${language}.json?cache=${new Date().getTime()}`).then(response => {
    window.__localeId__ = language
    i18n.global.locale = language
    // TODO not performant
    const messages = JSON.parse(
      JSON.stringify(response.data)
        .replaceAll('{{ ', '{')
        .replaceAll(' }}', '}'))
    i18n.global.setLocaleMessage(language, messages)
  })
}

loadLanguage(defaultLanguage)

export { i18n, loadLanguage }
