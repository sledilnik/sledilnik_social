import React from 'react';
import DataRow from '../../shared/ui/DataRow';
import DataPercentage from './PercentageRow/DataPercentage';

const defaults = {
  number: undefined,
  prefix: '',
  suffix: ', ',
  getPrefix: false,
};

const getFraction = (numerator = 0, denominator = 0) => numerator / denominator;
const getPercentage = value => value * 100;

function PercentageRow({
  title = '',
  numeratorOptions = { ...defaults },
  denominatorOptions = { ...defaults },
}) {
  const { number: numerator } = numeratorOptions;
  const { number: denominator } = denominatorOptions;
  const canNotCalc = isNaN(numerator) || isNaN(denominator);

  if (canNotCalc) {
    return (
      <DataRow title={title} endOfSentence={{ punctuationMark: '!' }}>
        <span>{' - odstotka ni mogoče izračunati'}</span>
      </DataRow>
    );
  }

  const fraction = getFraction(numerator, denominator);

  const percentage = getPercentage(fraction);

  return (
    <DataRow title={title}>
      <DataPercentage
        numeratorOptions={numeratorOptions}
        denominatorOptions={denominatorOptions}
        percentage={percentage}
      />
    </DataRow>
  );
}

export default PercentageRow;
