import React from 'react';
import EmbeddedNumber from './EmbeddedNumber';
import Percentage from '../TESTS_ACTIVE/Percentage';

// not sure if bussines logic checks for undefined
const defaults = {
  number: undefined,
  prefix: '',
  suffix: ', ',
  preSign: false,
};

function DataPercentage({
  numeratorOptions = { ...defaults },
  denominatorOptions = { ...defaults },
}) {
  return (
    <>
      <EmbeddedNumber
        className="bold"
        number={numeratorOptions.number}
        prefix={numeratorOptions.prefix}
        suffix={numeratorOptions.suffix}
        preSign={numeratorOptions.preSign}
      />
      <EmbeddedNumber
        className="bold"
        number={denominatorOptions.number}
        prefix={denominatorOptions.prefix}
        suffix={denominatorOptions.suffix}
        preSign={denominatorOptions.preSign}
      />
      <Percentage
        numerator={numeratorOptions.number}
        denominator={denominatorOptions.number}
      ></Percentage>
    </>
  );
}

export default DataPercentage;
