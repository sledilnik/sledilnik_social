import React from 'react';
import Translate from './Translate';

function DataTranslate({ number, text }) {
  return (
    <>
      <span className="bold"> {number} </span>
      <Translate text={text} number={number} />
    </>
  );
}

export default DataTranslate;
