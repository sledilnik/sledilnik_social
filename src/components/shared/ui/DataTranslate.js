import React from 'react';
import Translate from './Translate';
import { NumberFormat } from './StyledNumber';

function DataTranslate({ number, text }) {
  return (
    <>
      <NumberFormat className="bold" number={number} />{' '}
      <Translate text={text} number={number}></Translate>
    </>
  );
}

export default DataTranslate;
