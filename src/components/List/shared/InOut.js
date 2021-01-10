import React from 'react';
import Separator from './Separator';

function InOut({ numIn, numOut, insideColons = false }) {
  const plus = numIn === undefined ? '' : '+';
  const minus = numOut === undefined ? '' : '-';
  const comma = numOut === undefined ? '' : ', ';
  return (
    <>
      {insideColons ? '(' : ''}
      <span className="bold">
        {plus}
        <Separator number={numIn} />
        {comma}
        {minus}
        <Separator number={numOut} />
      </span>
      {insideColons ? ')' : ''}
    </>
  );
}

export default InOut;
