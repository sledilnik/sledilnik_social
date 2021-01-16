import React from 'react';
import { Row, Text, LocaleNumber, Bold } from '../../shared/ui/New';
import { LocaleNumberWithPlus } from './../../shared/ui/New';
import Translate from '../../shared/ui/Translate';

function Deceased({ title, deceased, deceasedToDate }) {
  return (
    <Row>
      <Text>{title}: </Text>
      <Bold>
        <LocaleNumberWithPlus number={deceased} />{' '}
      </Bold>
      <Translate text={'oseba'} number={deceased}></Translate>
      <Text>, skupaj: </Text>
      <Bold>
        <LocaleNumber number={deceasedToDate} />
      </Bold>
    </Row>
  );
}

export default Deceased;
