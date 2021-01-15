import React from 'react';
import StyledNumber from './StyledNumber';
const Delta = ({
  today,
  yesterday,
  withPrefix,
  noChanges,
  inBrackets = false,
}) => {
  let deltaCalculation = today - yesterday;

  const prefix = withPrefix
    ? today - yesterday === 0
      ? ''
      : today - yesterday > 0
      ? '+'
      : ''
    : '';

  return (
    <span className="bold">
      {inBrackets ? '(' : ''}
      {prefix}
      {noChanges === true ? (
        today - yesterday === 0 ? (
          'ni sprememb'
        ) : (
          <StyledNumber number={deltaCalculation} />
        )
      ) : (
        <StyledNumber number={deltaCalculation} />
      )}
      {inBrackets ? ')' : ''}
    </span>
  );
};
export default Delta;
