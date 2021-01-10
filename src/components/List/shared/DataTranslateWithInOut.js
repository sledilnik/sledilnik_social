import React from 'react';
import DataTranslate from './DataTranslate';
import InOut from './InOut';

function DataTranslateWithInOut({
  number,
  text,
  numIn,
  numOut,
  insideColons = false,
}) {
  return (
    <>
      <DataTranslate number={number} text={text} />{' '}
      <InOut numIn={numIn} numOut={numOut} insideColons={insideColons} />
    </>
  );
}

export default DataTranslateWithInOut;
