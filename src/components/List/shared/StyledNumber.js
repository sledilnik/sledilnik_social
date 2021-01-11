import React from 'react';
import Separator from './Separator';

function StyledNumber({ number, preSign = false, className }) {
  const isPositive = number > 0;
  const signShouldBePlus = preSign && isPositive;

  return (
    <span className={`${className}`}>
      {signShouldBePlus && '+'}
      <Separator number={number} />
    </span>
  );
}

export default StyledNumber;
