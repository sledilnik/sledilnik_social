import React from 'react';

import { Row, Text, LocaleNumber, Bold } from '../../shared/ui/New';

function Confirmed({ confirmed }) {
  return (
    <Row>
      <Text>Skupaj </Text>
      <Bold>
        <LocaleNumber number={confirmed} />
      </Bold>{' '}
      potrjenih primerov
    </Row>
  );
}

export default Confirmed;
