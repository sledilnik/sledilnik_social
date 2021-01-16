import React from 'react';

import DataTranslate from '../../shared/ui/DataTranslate';
import {
  Row,
  Text,
  Brackets,
  LocaleNumberWithPlus,
  Bold,
} from '../../shared/ui/New';

function Hospitalized({
  title,
  subtitle,
  hospitalized,
  translateText,
  hospitalizedIn,
  hospitalizedOut,
  icuNum,
  icuDelta,
}) {
  return (
    <Row>
      <Text>{title}: </Text>
      <DataTranslate number={hospitalized} text={translateText} />{' '}
      <Bold>
        <Brackets>
          <LocaleNumberWithPlus number={hospitalizedIn} />,{' '}
          <LocaleNumberWithPlus number={hospitalizedOut} />
        </Brackets>
      </Bold>
      <Text>, {subtitle}: </Text>
      <DataTranslate number={icuNum} text={translateText} />{' '}
      <Bold>
        <Brackets>
          <LocaleNumberWithPlus number={icuDelta} />
        </Brackets>
      </Bold>
    </Row>
  );
}

export default Hospitalized;
