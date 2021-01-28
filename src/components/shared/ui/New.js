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

// ? change to span
export const Brackets = ({ children }) => <>({children})</>;

export const NoData = ({ children, html = { tag: 'span', classes: '' } }) => {
  if (html.tag === 'span' || !html.tag) {
    return <span className={html.classes}>{children}</span>;
  }
  if (html.tag === 'p') {
    return <Row className={html.classes}>{children}</Row>;
  }
  return null;
};

export const RowSkeleton = () => <Row className="skeleton" noArrow={true} />;
