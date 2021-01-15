import React from 'react';

const isUndefined = value => value === undefined;
const isNull = value => value === null;
const isNullOrUndefined = value => isNull(value) || isUndefined(value);

const toLocale = value => value.toLocaleString('sl-SL');

function StyledNumber({
  number,
  fractionDigits = 0,
  getPrefix = false,
  className = '',
  getSuffix = false,
}) {
  if (isNullOrUndefined(number)) {
    return <span className={className}>{' - '}</span>;
  }

  const isPositive = number > 0;
  const getPlus = getPrefix && isPositive;
  const prefix = getPlus && '+';

  const suffix = getSuffix && '%';

  const rounded = +parseFloat(number).toFixed(fractionDigits);
  const locale = toLocale(rounded);

  return (
    <span className={className}>
      {prefix}
      {locale}
      {suffix}
    </span>
  );
}

export default StyledNumber;
