import React from 'react';
import DataRow from '../../shared/ui/DataRow';
import EmbeddedNumber from '../../shared/ui/EmbeddedNumber';

function Confirmed({ toDate }) {
  return (
    <DataRow>
      <EmbeddedNumber
        number={toDate}
        prefix={'Skupaj '}
        suffix={' potrjenih primerov'}
      />
    </DataRow>
  );
}

export default Confirmed;
