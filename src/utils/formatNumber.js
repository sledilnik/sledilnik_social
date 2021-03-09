export const formatNumberWithSign = number => {
  const result = new Intl.NumberFormat('sl-SL', {
    signDisplay: 'always',
  }).format(number);
  // {signDisplay: 'always'} not working on mobile
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  let isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  const isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
  let isSafari = navigator.userAgent.indexOf('Safari') > -1;
  if (isChrome && isSafari) {
    isSafari = false;
  }

  const noSupport = isSafari || isExplorer || isMobile;

  if (noSupport) {
    if (result.charCodeAt(0) === 8722 || result.charCodeAt(0) === 43) {
      // 8772 = '-', 43 = '+'
      console.log(result.charCodeAt(0), result[0]);
      return result;
    }
    const charCode = result.charCodeAt(0);
    return 48 <= charCode <= 57 ? '+' + result : result;
  }
  if (!noSupport) {
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
