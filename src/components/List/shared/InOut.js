import React from 'react';
import StyledNumber from './StyledNumber';

function InOut({ numIn, numOut, inBrackets = false }) {
  const plus = numIn === undefined ? '' : '+';
  const minus = numOut === undefined ? '' : '-';
  const comma = numOut === undefined ? '' : ', ';
  return (
    <span className="bold">
      {inBrackets ? '(' : ''}
      {plus}
      <StyledNumber number={numIn} />
      {comma}
      {minus}
      <StyledNumber number={numOut} />
      {inBrackets ? ')' : ''}
    </span>
  );
}

export default InOut;
