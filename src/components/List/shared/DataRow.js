import React from 'react';
import Arrow from './Arrow';

function DataRow({
  children,
  title,
  noColon,
  endOfSentence = { end: true, punctuationMark: '.' },
}) {
  let colon = !title || noColon ? ' ' : ': ';

  const { end, punctuationMark } = endOfSentence;

  return (
    <p className="text">
      <Arrow /> {title}
      {colon}
      {children}
      {end && punctuationMark}
    </p>
  );
}

export default DataRow;
