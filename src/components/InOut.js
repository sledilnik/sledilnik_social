import React from 'react';
import Separator from './Separator';

function InOut({ numIn, numOut, insideColons = false }) {
  return (
    <>
      {insideColons ? '(' : ''}
      <span className="bold">
        +<Separator number={numIn} /> -<Separator number={numOut} />
      </span>
      {insideColons ? ')' : ''}
    </>
  );
}

export default InOut;
