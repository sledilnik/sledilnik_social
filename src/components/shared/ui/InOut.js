import React from 'react';
import { NumberFormat } from './StyledNumber';

// TODO isUndefined
function InOut({ numIn, numOut, inBrackets = false }) {
  const plus = numIn === undefined ? '' : '+';
  const minus = numOut === undefined ? '' : '-';
  const comma = numOut === undefined ? '' : ', ';
  return (
    <span className="bold">
      {inBrackets ? '(' : ''}
      {plus}
      <NumberFormat number={numIn} getPrefix={false} />
      {comma}
      {minus}
      <NumberFormat number={numOut} getPrefix={false} />
      {inBrackets ? ')' : ''}
    </span>
  );
}

export default InOut;
