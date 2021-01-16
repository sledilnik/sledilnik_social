import React from 'react';
import Translate from './Translate';
import { Bold, LocaleNumber } from './New';

function DataTranslate({ number, text }) {
  return (
    <>
      <Bold>
        <LocaleNumber number={number} />{' '}
      </Bold>
      <Translate text={text} number={number}></Translate>
    </>
  );
}

export default DataTranslate;
