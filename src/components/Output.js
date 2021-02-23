import React, { useContext } from 'react';
import DataRow from './DataRow';
import { SocialContext } from '../context/SocialContext';

function Output({ output, noArrow, markFail, ...props }) {
  return (
    <DataRow
      dataString={output}
      noArrow={noArrow}
      markFail={markFail}
      {...props}
    />
  );
}

function withOutputHOC(Component) {
  const WithOutput = props => {
    const { social } = useContext(SocialContext);
    const { kindOfData, TextsDict, defaultTexts, ...rest1 } = props;
    const canTranslate = ['FB', 'TW'].includes(social) && !!kindOfData;
    const texts = canTranslate
      ? { ...defaultTexts, ...TextsDict[social][kindOfData] }
      : { ...defaultTexts };

    const { isWrongDate, keyTitle, data, ...rest2 } = rest1;

    const color = isWrongDate ? 'var(--red)' : 'initial';

    const output = Object.values(texts).map((item, index) => (
      <span key={`${keyTitle}-${index}`} style={{ color }}>
        {item}
        <span style={{ fontWeight: 700 }}>{data[`value${index + 1}`]}</span>
      </span>
    ));

    return <Component output={output} {...rest2} />;
  };
  return WithOutput;
}
export default withOutputHOC(Output);
