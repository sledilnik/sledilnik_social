import React from 'react';
const Percentage = ({ part, total, minus1, getPrefix }) => {
  const percentage =
    total &&
    part &&
    Math.round(
      (part / total - (minus1 === true ? 1 : 0) + Number.EPSILON) * 1000
    ) / 10;

  return (
    <span className="bold">
      {getPrefix ? (part > total ? '+' : '-') : ''}
      {percentage.toString().replace(/\./g, ',')}
    </span>
  );
};
export default Percentage;
