import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';

function Hospitalized({
  title,
  subtitle,
  hospitalized,
  hospitalizedIn,
  hospitalizedOut,
  icuNum,
  icuDelta,
}) {
  return (
    <Row>
      {title}: <span className="bold">{hospitalized}</span>
      <span className="bold">
        <Brackets>
          {hospitalizedIn}, {hospitalizedOut}
        </Brackets>
      </span>
      , {subtitle}: <span className="bold">{icuNum}</span>
      <span className="bold">
        <Brackets>{icuDelta}</Brackets>
      </span>
    </Row>
  );
}

export default Hospitalized;
