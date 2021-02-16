import React from 'react';

import './Card.css';

import { formatRelative } from 'date-fns';
import { sl } from 'date-fns/locale';

import sledilnikLogo from '../assets/sledilnik-logo.svg';

const Logo = ({
  src = sledilnikLogo,
  alt = 'logo',
  width = '96',
  height = '96',
}) => (
  <img
    src={src}
    alt={alt}
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
    <details className="Card" open={open}>
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
