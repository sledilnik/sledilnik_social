import React from 'react';

import DataRow from '../../shared/ui/DataRow';
import EmbeddedNumberInOut from '../../shared/ui/EmbeddedNumberInOut';

function ActiveCasesRow({
  title = '',
  number = 0,
  numIn = 0,
  numOut = 0,
  suffix = '',
  inBrackets = true,
}) {
  return (
    <DataRow title={title}>
      <EmbeddedNumberInOut
        number={number}
        numIn={numIn}
        numOut={numOut}
        suffix={suffix}
        inBrackets={inBrackets}
      />
    </DataRow>
  );
}

export default ActiveCasesRow;
