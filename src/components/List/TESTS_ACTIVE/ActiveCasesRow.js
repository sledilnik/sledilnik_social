import React from 'react';

import {
  Text,
  Row,
  Bold,
  LocaleNumber,
  LocaleNumberWithPlus,
  Brackets,
} from '../../shared/ui/New';

// TODO params: isUndefined, isNull?
function ActiveCasesRow({ casesActive, casesActiveIn, casesActiveOut }) {
  return (
    <Row>
      <Text> Aktivni primeri: </Text>
      <Bold>
        <LocaleNumber number={casesActive} />{' '}
        <Brackets>
          <LocaleNumberWithPlus number={casesActiveIn} />,{' '}
          <LocaleNumber number={-casesActiveOut} />
        </Brackets>
      </Bold>
    </Row>
  );
}

export default ActiveCasesRow;
