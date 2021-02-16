import React from 'react';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Arrow = () => <Emoji emoji={'➡️'} ariaLabel={'arrow'} />;

function DataRow({ dataString, noArrow = false, children }) {
  return (
    <p>
      {!noArrow && <Arrow />} {dataString}
      {children}
    </p>
  );
}

export default DataRow;
