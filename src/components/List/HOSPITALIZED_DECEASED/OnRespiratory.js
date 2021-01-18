import React from 'react';
import Translate from '../../shared/ui/Translate';
import DataTranslate from '../../shared/ui/DataTranslate';
import { Row, Brackets } from '../../shared/ui/New';

function OnRespiratory({ today, delta }) {
  return (
    <Row>
      Na respiratorju (intubirani) se{' '}
      <Translate text={'zdravi'} number={today} />{' '}
      <DataTranslate number={today} text={'oseba'} />{' '}
      <span className="bold">
        <Brackets>{delta}</Brackets>
      </span>
    </Row>
  );
}

export default OnRespiratory;
