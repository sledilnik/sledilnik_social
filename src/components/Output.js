import React, { useContext } from 'react';

import { SocialContext } from '../context/SocialContext';
import DataRow from './DataRow';
import TextsDict, { DefaultTextsDict } from '../dicts/SocialTextsDict';
import SomethingWentWrong from './SomethingWentWrong';

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
    const { error, keyTitle, ...rest1 } = props;
    if (error) {
      return <SomethingWentWrong title={keyTitle} {...rest1} />;
    }

    const { kindOfData, ...rest2 } = rest1;
    const texts = {
      ...DefaultTextsDict[keyTitle].default,
      ...TextsDict[social][keyTitle][kindOfData],
    };

    const { isWrongDate, data, ...rest3 } = rest2;
    const color = isWrongDate ? 'var(--red)' : 'initial';
    const output = Object.values(texts).map((item, index) => (
      <span key={`${keyTitle}-${index}`} style={{ color }}>
        {item}
        <span style={{ fontWeight: 700 }}>{data[`value${index + 1}`]}</span>
      </span>
    ));

    return <Component output={output} markFail={isWrongDate} {...rest3} />;
  };
  return WithOutput;
}
export default withOutputHOC(Output);
