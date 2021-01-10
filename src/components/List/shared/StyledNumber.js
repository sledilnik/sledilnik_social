import React from 'react';
import Separator from './Separator';

function StyledNumber({ number, prefix = false, className }) {
  const isPositive = number > 0;
  const isNegative = number < 0;

  const signShouldBePlus = prefix && isPositive;
  const signShouldBeMinus = prefix && isNegative;

  return (
    <span className={`${className}`}>
      {signShouldBePlus && '+'}
      {signShouldBeMinus && '-'}
      <Separator number={number} />
    </span>
  );
}

export default StyledNumber;
