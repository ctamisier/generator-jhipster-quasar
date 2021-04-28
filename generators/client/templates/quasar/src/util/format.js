import { format as format_, formatDistanceStrict as formatDistanceStrict_ } from 'date-fns';
import { importLocale } from '../constants/i18nConstants';

export function format(date, formatStr = 'PPpp') {
  return format_(date, formatStr, { locale: importLocale().default });
}

export function formatDistanceStrict(date, baseDate = new Date(0)) {
  return formatDistanceStrict_(date, baseDate, { locale: importLocale().default });
}
