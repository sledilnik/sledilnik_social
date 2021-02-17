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

function Card({ id, summary, dates = {}, children, open = false }) {
  const sortedDates = [...Object.values(dates)].sort((a, b) => b - a);

  const noDates = Object.values(dates).every(item => item === null);

  const relativeDate = noDates ? (
    <span style={{ opacity: 0, marginLeft: '24px' }}>loading...</span>
  ) : (
    formatRelative(new Date(sortedDates[0] * 1000), new Date(), {
      locale: sl,
    })
  );

  return (
    <details id={id} className="Card" open={open}>
      <summary>
        <h2>{summary}</h2>
        <div>Osveženo: {relativeDate}</div>
      </summary>
      {children}
      <Logo />
    </details>
  );
}

export default Card;
