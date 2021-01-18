const createLocaleNumberFormat = locale => options => number =>
  new Intl.NumberFormat(locale, options).format(number);
export const createLocaleOptions = createLocaleNumberFormat('sl-SL');
export const alwaysSignDisplay = createLocaleOptions({ signDisplay: 'always' });
export const formatNumber = createLocaleOptions();
export const percentStyle = createLocaleOptions({
  style: 'percent',
  maximumFractionDigits: 1,
});
export default createLocaleNumberFormat;
