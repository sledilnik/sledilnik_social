import React from 'react';
import Separator from './Separator';
const Delta = ({
  today,
  yesterday,
  withPrefix,
  noChanges,
  insideColons = false,
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
      {insideColons ? '(' : ''}
      {prefix}
      {noChanges === true ? (
        today - yesterday === 0 ? (
          'ni sprememb'
        ) : (
          <Separator number={deltaCalculation} />
        )
      ) : (
        <Separator number={deltaCalculation} />
      )}
      {insideColons ? ')' : ''}
    </span>
  );
};
export default Delta;
