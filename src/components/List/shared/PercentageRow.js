import React from 'react';
import DataRow from './DataRow';
import DataPercentage from './DataPercentage';

const defaults = {
  number: undefined,
  prefix: '',
  suffix: ', ',
  getPrefix: false,
};

function PercentageRow({
  title = '',
  numeratorOptions = { ...defaults },
  denominatorOptions = { ...defaults },
}) {
  return (
    <DataRow title={title}>
      <DataPercentage
        numeratorOptions={numeratorOptions}
        denominatorOptions={denominatorOptions}
      />
    </DataRow>
  );
}

export default PercentageRow;
