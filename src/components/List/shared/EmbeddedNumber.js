import React from 'react';
import StyledNumber from './StyledNumber';

function EmbeddedNumber({ number, prefix, suffix, preSign = false }) {
  return (
    <>
      {prefix}
      <StyledNumber className="bold" number={number} preSign={preSign} />
      {suffix}
    </>
  );
}

export default EmbeddedNumber;
