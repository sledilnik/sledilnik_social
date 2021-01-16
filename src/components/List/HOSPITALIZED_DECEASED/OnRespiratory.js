import React from 'react';
import Translate from '../../shared/ui/Translate';
import DataTranslate from '../../shared/ui/DataTranslate';
import {
  Row,
  Text,
  Brackets,
  LocaleNumberWithPlus,
  Bold,
} from '../../shared/ui/New';

function OnRespiratory({ today, yesterday }) {
  const delta = today - yesterday;

  return (
    <Row>
      <Text>Na respiratorju (intubirani) se </Text>
      <Translate text={'zdravi'} number={today}></Translate>{' '}
      <DataTranslate number={today} text={'oseba'} />{' '}
      <Bold>
        <Brackets>
          <LocaleNumberWithPlus number={delta} />
        </Brackets>
      </Bold>
    </Row>
  );
}

export default OnRespiratory;
