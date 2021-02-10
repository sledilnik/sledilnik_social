import React, { useContext } from 'react';
import { TimestampsContext } from '../context/TimestampsContext';
import { formatDistance, formatRelative } from 'date-fns';
import { sl } from 'date-fns/esm/locale';
import { RowSkeleton } from './shared/ui/New';

const DAYS_6_MILLISECONDS = 6 * 24 * 60 * 60 * 1000;

const is6OrMoreDaysOld = date => {
  const today = new Date();
  const distanceInMilliseconds = today - date;
  return distanceInMilliseconds > DAYS_6_MILLISECONDS;
};

function relativeDate(ts) {
  const date = new Date(ts);
  if (is6OrMoreDaysOld(date))
    return formatDistance(date, new Date(), { locale: sl, addSuffix: true });

  return formatRelative(date, new Date(), { locale: sl });
}

function Timestamps() {
  const timestamps = useContext(TimestampsContext);

  if (!timestamps) {
    return null;
  }

  const latest = timestamps && Math.max(...Object.values(timestamps));
  const latestDate = relativeDate(latest * 1000);

  const output = Object.entries(timestamps).map(([key, ts]) => {
    if (ts === null) {
      return (
        <div key={key + ts} style={{ width: '100%' }}>
          <RowSkeleton />
        </div>
      );
    }
    const dateString = relativeDate(ts * 1000);
    return (
      <p key={key + ts} style={{ width: '100%', margin: '0 16px' }}>
        <span style={{ fontWeight: 700 }}>{key}:</span> {dateString}{' '}
      </p>
    );
  });

  return (
    <details
      style={{
        margin: '0 16px',
        padding: '8px 0',
        marginTop: '10vh',
        fontSize: '0.8em',
        color: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <summary style={{ fontSize: '1.1em' }}>
        <span style={{ fontWeight: 700 }}>csv datoteke osvežene:</span>{' '}
        {latestDate}
      </summary>
      {output}
    </details>
  );
}

export default Timestamps;
