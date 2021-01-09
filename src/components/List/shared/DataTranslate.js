import React from 'react';
import Separator from './Separator';
import Translate from './Translate';

function DataTranslate({ number, text }) {
  return (
    <>
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      <Translate text={text} number={number}></Translate>{' '}
    </>
  );
}

export default DataTranslate;
