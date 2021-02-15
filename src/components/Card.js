import React from 'react';
import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/sledilnik-logo.svg';

const Logo = ({
  className,
  src = sledilnikLogo,
  alt = 'logo',
  width = '96',
  height = '96',
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    width={width}
    height={height}
    style={{ display: 'block', margin: '0 auto' }}
  />
);

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
      <Logo />
    </details>
  );
}

export default Card;
