import React from 'react';
import DataRow from './DataRow';

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
    const { kindOfData, TextsDict, social, defaultTexts, ...rest1 } = props;

    const DefaultDict = kindOfData ? TextsDict.FB[kindOfData] : {};
    const SocialDict =
      social || kindOfData ? TextsDict[social][kindOfData] : {};

    const texts = {
      ...defaultTexts,
      ...DefaultDict,
      ...SocialDict,
    };

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
