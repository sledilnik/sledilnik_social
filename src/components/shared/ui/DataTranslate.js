import React from 'react';
import Translate from './Translate';
import StyledNumber from './StyledNumber';

function DataTranslate({ number, text }) {
  return (
    <>
      <StyledNumber className="bold" number={number} />{' '}
      <Translate text={text} number={number}></Translate>
    </>
  );
}

export default DataTranslate;
