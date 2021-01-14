import React from 'react';
const Percentage = ({
  numerator = 0,
  denominator = 0,
  minus1 = false,
  getPrefix = false,
}) => {
  const percentage =
    denominator &&
    numerator &&
    Math.round(
      (numerator / denominator - (minus1 === true ? 1 : 0) + Number.EPSILON) *
        1000
    ) / 10;

  return (
    <span className="bold">
      {getPrefix ? (numerator > denominator ? '+' : '-') : ''}
      {percentage.toLocaleString('sl-SL')}
    </span>
  );
};
export default Percentage;
