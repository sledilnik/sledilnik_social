import format from 'date-fns/format';
import { sl } from 'date-fns/locale';
export function formatToLocaleDateString(
  dateAsText = '',
  formatStr = 'd.M.yyyy',
  options = { locale: sl }
) {
  const date = new Date(dateAsText);
  return format(date, formatStr, options);
}

// date received is part of an object with properties: year, month, day
export function getDate(obj = {}) {
  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}
