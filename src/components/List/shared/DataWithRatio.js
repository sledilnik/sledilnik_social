import React from 'react';
import StyledNumberWithText from './StyledNumberWithText';
import Percentage from '../TESTS_ACTIVE/Percentage';

function DataWithRatio({ numPositive, numPerformed }) {
  return (
    <>
      <StyledNumberWithText
        className="bold"
        number={numPositive}
        preSign={true}
        suffix=", "
      />
      <StyledNumberWithText
        className="bold"
        number={numPerformed}
        prefix={'testiranih: '}
        suffix={', delež pozitivnih: '}
      />
      <Percentage part={numPositive} total={numPerformed}></Percentage>%
    </>
  );
}

export default DataWithRatio;
