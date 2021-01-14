import React from 'react';

const getFraction = (numerator = 0, denominator = 0) => numerator / denominator;
const getPercentage = value => value * 100;

// use Memo?
const Percentage = ({
  numerator = 0,
  denominator = 0,
  includeSuffix = true,
}) => {
  const fraction = getFraction(numerator, denominator);

  if (fraction === Infinity) {
    return <span className="bold">{' - '}</span>;
  }

  const percentage = getPercentage(fraction);
  const rounded = +parseFloat(percentage).toFixed(1);

  const suffix = includeSuffix ? '%' : '';

  return (
    <span className="bold">
      {rounded.toLocaleString('sl-SL')}
      {suffix}
    </span>
  );
};
export default Percentage;
