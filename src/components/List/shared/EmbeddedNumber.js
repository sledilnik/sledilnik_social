import React from 'react';
import StyledNumber from './StyledNumber';

function EmbeddedNumber({
  number,
  prefix,
  suffix,
  getPrefix = false,
}) {
  return (
    <>
      {prefix}
      <StyledNumber
        className="bold"
        number={number}
        getPrefix={getPrefix}
      />
      {suffix}
    </>
  );
}

export default EmbeddedNumber;
