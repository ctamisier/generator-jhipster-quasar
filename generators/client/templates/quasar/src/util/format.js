import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

const locales = { enUS, fr };

export default function (date, formatStr = 'PPpp') {
  return format(date, formatStr, {
    locale: locales[window.__localeId__],
  });
}
