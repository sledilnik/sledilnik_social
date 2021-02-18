import React from 'react';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Arrow = () => <Emoji emoji={'➡️'} ariaLabel={'arrow'} />;

const MarkFail = () => <Emoji emoji={'❌'} ariaLabel="cross mark" />;

function DataRow({ dataString, noArrow = false, children, markFail = false }) {
  return (
    <p>
      {markFail && <MarkFail />}
      {!noArrow && !markFail && <Arrow />} {dataString}
      {children}
    </p>
  );
}

export default DataRow;
