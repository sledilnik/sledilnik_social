import React from 'react';

export const Text = ({ className = '', children }) => {
  return <span className={className}>{children}</span>;
};

export const Bold = ({ className = '', children }) => {
  return <Text className={`bold ${className}`}>{children}</Text>;
};

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

const isUndefined = value => value === undefined;
const isNull = value => value === null;
const isNullOrUndefined = value => isNull(value) || isUndefined(value);
export const LocaleNumber = ({
  number,
  fractionDigits = 0,
  withPlus = false,
  isPercent = false,
}) => {
  if (isNullOrUndefined(number)) {
    return <> - </>;
  }

  const isPositive = number > 0;
  const isPlus = withPlus && isPositive;

  const toLocale = value => value.toLocaleString('sl-SL');
  const rounded = +parseFloat(number).toFixed(fractionDigits);
  const locale = toLocale(rounded);
  return (
    <>
      {isPlus && '+'}
      {locale}
      {isPercent && '%'}
    </>
  );
};

export const LocaleNumberWithPlus = ({ number, fractionDigits = 0 }) => (
  <LocaleNumber
    number={number}
    fractionDigits={fractionDigits}
    withPlus={true}
  />
);

export const LocaleNumberWithPercent = ({ number, fractionDigits = 0 }) => (
  <LocaleNumber
    number={number}
    fractionDigits={fractionDigits}
    isPercent={true}
  />
);

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
    return (
      <Row className={html.classes}>
        <Text>{text}</Text>
      </Row>
    );
  }
  return;
};
