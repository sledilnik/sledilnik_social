import React from 'react';
import EmbeddedNumber from './EmbeddedNumber';

// not sure if bussines logic checks for undefined
const defaults = {
  number: undefined,
  prefix: '',
  suffix: ', ',
  getPrefix: false,
};

function DataPercentage({
  numeratorOptions = { ...defaults },
  denominatorOptions = { ...defaults },
  percentage,
}) {
  const renderPercentage = isFinite(percentage);

  return (
    <>
      <EmbeddedNumber
        className="bold"
        number={numeratorOptions.number}
        prefix={numeratorOptions.prefix}
        suffix={numeratorOptions.suffix}
        getPrefix={numeratorOptions.getPrefix}
      />
      <EmbeddedNumber
        className="bold"
        number={denominatorOptions.number}
        prefix={denominatorOptions.prefix}
        suffix={denominatorOptions.suffix}
        getPrefix={denominatorOptions.getPrefix}
      />
      {renderPercentage ? (
        <EmbeddedNumber
          className="bold"
          number={percentage}
          getSuffix={true}
          fractionDigits={1}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default DataPercentage;
