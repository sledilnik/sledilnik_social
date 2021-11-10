import React, { useContext } from 'react';

import { SocialContext } from '../../context/SocialContext';
import DataRow from 'components/Shared/DataRow';
import TextsDict from '../../dicts/SocialTextsDict';

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
    const { keyTitle, kindOfData, ...rest1 } = props;

    const texts = { ...TextsDict[social][keyTitle][kindOfData] };

    const { isWrongDate, data, ...rest2 } = rest1;
    const color = isWrongDate ? 'var(--red)' : 'initial';
    const output = Object.values(texts).map((item, index) => (
      <span key={`${keyTitle}-${index}`} style={{ color }}>
        {item}
        <span style={{ fontWeight: 700 }}>{data[`value${index + 1}`]}</span>
      </span>
    ));

    return <Component output={output} markFail={isWrongDate} {...rest2} />;
  };
  return WithOutput;
}
export default withOutputHOC(Output);
