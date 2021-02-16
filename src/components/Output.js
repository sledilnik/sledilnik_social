import React from 'react';
import DataRow from './DataRow';

function Output({ data, defaultTexts, TextsDict, keyTitle, ...props }) {
  const { social, kindOfData } = props;
  const texts = {
    ...defaultTexts,
    ...TextsDict.FB[kindOfData],
    ...TextsDict[social][kindOfData],
  };

  const output = Object.values(texts).map((item, index) => (
    <span key={`${keyTitle}-${index}`}>
      {item}
      <span style={{ fontWeight: 700 }}>{data[`value${index + 1}`]}</span>
    </span>
  ));

  return <DataRow dataString={output} />;
}

export default Output;
