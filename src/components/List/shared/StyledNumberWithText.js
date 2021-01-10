import React from 'react';
import StyledNumber from './StyledNumber';

function StyledNumberWithText({ number, prefix, suffix, numSign = false }) {
  return (
    <>
      {prefix}{' '}
      <StyledNumber className="bold" number={number} prefix={numSign} />{' '}
      {suffix}
    </>
  );
}

export default StyledNumberWithText;
