export const formatNumberWithSign = number => {
  const result = new Intl.NumberFormat('sl-SL', {
    signDisplay: 'always',
  }).format(number);
  // {signDisplay: 'always'} not working on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    if (result.charCodeAt(0) === 8722) {
      return result;
    }
    const charCode = result.charCodeAt(0);
    return 48 <= charCode <= 57 ? '+' + result : result;
  }
  if (!isMobile) {
    return result;
  }
};
export const formatNumber = number =>
  new Intl.NumberFormat('sl-SL').format(number);
export const formatPercentage = number =>
  new Intl.NumberFormat('sl-SL', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(number);
