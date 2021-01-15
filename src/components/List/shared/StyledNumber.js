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
}) {
  if (isNullOrUndefined(number)) {
    return <span className={className}>{' - '}</span>;
  }

  const isPositive = number > 0;
  const signShouldBePlus = getPrefix && isPositive;
  const prefix = signShouldBePlus && '+';

  const rounded = +parseFloat(number).toFixed(fractionDigits);
  const locale = toLocale(rounded);

  return (
    <span className={className}>
      {prefix}
      {locale}
    </span>
  );
}

export default StyledNumber;
