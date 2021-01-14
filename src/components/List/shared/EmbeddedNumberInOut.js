import React from 'react';
import EmbeddedNumber from './EmbeddedNumber';
import InOut from './InOut';

function EmbeddedNumberInOut({
  number,
  prefix,
  suffix,
  numSign = false,
  numIn,
  numOut,
  inBrackets,
}) {
  return (
    <>
      <EmbeddedNumber
        number={number}
        prefix={prefix}
        suffix={suffix}
        numSign={numSign}
      />
      <InOut numIn={numIn} numOut={numOut} inBrackets={inBrackets} />
    </>
  );
}

export default EmbeddedNumberInOut;
