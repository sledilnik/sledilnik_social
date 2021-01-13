import React from 'react';
import Separator from './Separator';

function InOut({ numIn, numOut, insideColons = false }) {
  const plus = numIn === undefined ? '' : '+';
  const minus = numOut === undefined ? '' : '-';
  const comma = numOut === undefined ? '' : ', ';
  return (
    <span className="bold">
      {insideColons ? '(' : ''}
      {plus}
      <Separator number={numIn} />
      {comma}
      {minus}
      <Separator number={numOut} />
      {insideColons ? ')' : ''}
    </span>
  );
}

export default InOut;
