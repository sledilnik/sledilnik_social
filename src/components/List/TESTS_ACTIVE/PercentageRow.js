import React from 'react';

import {
  Row,
  Bold,
  LocaleNumberWithPlus,
  LocaleNumber,
  Text,
  LocaleNumberWithPercent,
} from '../../shared/ui/New';

function PercentageRow({ title = '', numerator, denominator, percent }) {
  return (
    <Row>
      <Text> {title}: </Text>
      <Bold>
        <LocaleNumberWithPlus number={numerator} />
      </Bold>
      <Text>, testiranih: </Text>
      <Bold>
        <LocaleNumber number={denominator} />
      </Bold>
      <Text>, delež pozitivnih: </Text>
      <Bold>
        <LocaleNumberWithPercent number={percent} fractionDigits={1} />
      </Bold>
    </Row>
  );
}

export default PercentageRow;
