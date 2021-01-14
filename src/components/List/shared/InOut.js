import React from 'react';
import Separator from './Separator';

function InOut({ numIn, numOut, inBrackets = false }) {
  const plus = numIn === undefined ? '' : '+';
  const minus = numOut === undefined ? '' : '-';
  const comma = numOut === undefined ? '' : ', ';
  return (
    <span className="bold">
      {inBrackets ? '(' : ''}
      {plus}
      <Separator number={numIn} />
      {comma}
      {minus}
      <Separator number={numOut} />
      {inBrackets ? ')' : ''}
    </span>
  );
}

export default InOut;
