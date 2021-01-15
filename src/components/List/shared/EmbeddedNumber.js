import React from 'react';
import StyledNumber from './StyledNumber';

function EmbeddedNumber({
  number,
  prefix,
  suffix,
  getPrefix = false,
  getSuffix = false,
  fractionDigits = 0,
}) {
  return (
    <>
      {prefix}
      <StyledNumber
        className="bold"
        number={number}
        getPrefix={getPrefix}
        getSuffix={getSuffix}
        fractionDigits={fractionDigits}
      />
      {suffix}
    </>
  );
}

export default EmbeddedNumber;
