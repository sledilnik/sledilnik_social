import React from 'react';
import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

function Card({ summary, dates = {}, children, open = false }) {
  const datesOutput = Object.entries(dates).map(([path, ts], index) => (
    <span key={ts + '-' + index}>
      {path}:{' '}
      {formatRelative(new Date(ts * 1000), new Date(), {
        locale: sl,
      })}{' '}
    </span>
  ));

  return (
    <details open={open}>
      <summary>
        <h2>{summary}</h2>
        {datesOutput}
      </summary>
      {children}
    </details>
  );
}

export default Card;
