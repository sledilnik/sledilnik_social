export const formatNumberWithSign = number =>
  new Intl.NumberFormat('sl-SL', { signDisplay: 'always' }).format(number);
export const formatNumber = number =>
  new Intl.NumberFormat('sl-SL').format(number);
export const formatPercentage = number =>
  new Intl.NumberFormat('sl-SL', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(number);
