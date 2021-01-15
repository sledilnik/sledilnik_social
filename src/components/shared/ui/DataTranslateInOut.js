import React from 'react';
import DataTranslate from './DataTranslate';
import InOut from './InOut';

function DataTranslateInOut({
  number,
  text,
  numIn,
  numOut,
  inBrackets = false,
}) {
  return (
    <>
      <DataTranslate number={number} text={text} />{' '}
      <InOut numIn={numIn} numOut={numOut} inBrackets={inBrackets} />
    </>
  );
}

export default DataTranslateInOut;
