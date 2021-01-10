import React from 'react';
import Separator from './Separator';

function StyledNumber({ number, preSign = false, className }) {
  const isPositive = number > 0;
  const isNegative = number < 0;

  const signShouldBePlus = preSign && isPositive;
  const signShouldBeMinus = preSign && isNegative;

  return (
    <span className={`${className}`}>
      {signShouldBePlus && '+'}
      {signShouldBeMinus && '-'}
      <Separator number={number} />
    </span>
  );
}

export default StyledNumber;
