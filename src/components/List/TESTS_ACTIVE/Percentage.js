import React from 'react';
const Percentage = ({ numerator, denominator, minus1, getPrefix }) => {
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
      {percentage.toString().replace(/\./g, ',')}
    </span>
  );
};
export default Percentage;
