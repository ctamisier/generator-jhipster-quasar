import { format } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

const locales = { enGB, fr }

export default function (date, formatStr = 'PPpp') {
  return format(date, formatStr, {
    locale: locales[window.__localeId__]
  })
}
