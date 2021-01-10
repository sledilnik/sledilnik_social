import React from 'react';
import StyledNumberWithText from './StyledNumberWithText';
import InOut from './InOut';

function StyledNumberWithInOut({
  number,
  prefix,
  suffix,
  numSign = false,
  numIn,
  numOut,
  insideColons,
}) {
  return (
    <>
      <StyledNumberWithText
        number={number}
        prefix={prefix}
        suffix={suffix}
        numSign={numSign}
      />
      <InOut numIn={numIn} numOut={numOut} insideColons={insideColons} />
    </>
  );
}

export default StyledNumberWithInOut;
