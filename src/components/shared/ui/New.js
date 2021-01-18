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

export const Brackets = ({ children }) => <>({children})</>;

// TODO implement
export const isOneArgumentUndefined = (values = {}) => {
  const isUndefined = value => value === undefined;
  let result = false;
  for (const [key, value] of Object.entries(values)) {
    const valueIsUndefined = isUndefined(value);
    if (valueIsUndefined) {
      console.warn(`Argument: ${key} is undefined!`);
      result = true;
    }
  }
  return result;
};

// TODO implement
export const NoData = ({ text, html = { tag: 'span', classes: '' } }) => {
  if (html.tag === 'span') {
    return <span className={html.classes}>{text}</span>;
  }
  if (html.tag === 'p') {
    return <Row className={html.classes}>{text}</Row>;
  }
  return;
};
