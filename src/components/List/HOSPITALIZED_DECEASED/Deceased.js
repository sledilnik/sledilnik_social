import React from 'react';
import { Row, Text, LocaleNumber, Bold } from '../../shared/ui/New';
import { LocaleNumberWithPlus } from './../../shared/ui/New';
import Translate from '../../shared/ui/Translate';

function Deceased({ title, subtitle, translate, deceased, deceasedToDate }) {
  return (
    <Row>
      <Text>{title}: </Text>
      <Bold>
        <LocaleNumberWithPlus number={deceased} />{' '}
      </Bold>
      <Translate text={translate} number={deceased}></Translate>
      <Text>, {subtitle}: </Text>
      <Bold>
        <LocaleNumber number={deceasedToDate} />
      </Bold>
    </Row>
  );
}

export default Deceased;
