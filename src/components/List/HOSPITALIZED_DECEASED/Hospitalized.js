import React from 'react';

import DataTranslate from '../../shared/ui/DataTranslate';
import { Row, Brackets } from '../../shared/ui/New';

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
      {title}:
      <DataTranslate number={hospitalized} text={translateText} />{' '}
      <span className="bold">
        <Brackets>
          {hospitalizedIn}, {hospitalizedOut}
        </Brackets>
      </span>
      , {subtitle}:
      <DataTranslate number={icuNum} text={translateText} />{' '}
      <span className="bold">
        <Brackets>{icuDelta}</Brackets>
      </span>
    </Row>
  );
}

export default Hospitalized;
