import { format } from 'date-fns';
import { importLocale } from '../constants/i18nConstants'

export default function (date, formatStr = 'PPpp') {
  return format(date, formatStr, {
    locale: importLocale(),
  });
}
