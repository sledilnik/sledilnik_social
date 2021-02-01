import React from 'react';

export const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

export const Arrow = () => <Emoji emoji={'➡️'} ariaLabel={'arrow'} />;

export const Row = ({
  children,
  end = true,
  punctuationMark = '.',
  noArrow = false,
  className = '',
}) => {
  return (
    <p className={`text ${className}`}>
      {noArrow ? '' : <Arrow />} {children}
      {end && punctuationMark}
    </p>
  );
};

export const RowSkeleton = () => <Row className="skeleton" noArrow={true} />;
export const RowError = () => (
  <Row className="bold" punctuationMark="!">
    Nekaj je narobe. Prosim, poizkusite kasneje
  </Row>
);
export const Brackets = ({ children }) => <>({children})</>;
