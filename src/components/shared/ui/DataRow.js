import React from 'react';
import Arrow from './Arrow';

function DataRow({
  children,
  title,
  noColon,
  endOfSentence = { end: true, punctuationMark: '.' },
  noArrow = false,
}) {
  let colon = !title || noColon ? ' ' : ': ';

  const { end, punctuationMark } = endOfSentence;

  return (
    <p className="text">
      {noArrow ? '' : <Arrow />} {title}
      {colon}
      {children}
      {end && punctuationMark}
    </p>
  );
}

export default DataRow;
