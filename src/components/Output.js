import React from 'react';
import DataRow from './DataRow';

function Output({
  data,
  defaultTexts,
  TextsDict,
  keyTitle,
  noArrow = false,
  ...props
}) {
  const { social, kindOfData, wrongDate } = props;
  const texts = {
    ...defaultTexts,
    ...TextsDict.FB[kindOfData],
    ...TextsDict[social][kindOfData],
  };

  const color = wrongDate ? 'var(--red)' : 'initial';

  const output = Object.values(texts).map((item, index) => (
    <span key={`${keyTitle}-${index}`} style={{ color }}>
      {item}
      <span style={{ fontWeight: 700 }}>{data[`value${index + 1}`]}</span>
    </span>
  ));

  return <DataRow dataString={output} noArrow={noArrow} markFail={wrongDate} />;
}

export default Output;
