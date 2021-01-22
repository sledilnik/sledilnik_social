import React from 'react';
import { Row, Brackets } from '../../shared/ui/New';

function OnRespiratory({
  title,
  todayCritical,
  criticalDelta,
  todayNiv,
  nivDelta,
}) {
  // Na respiratorju: 144, neinvazivno: 12 (-1), intubirani: 132 (-2)
  return (
    <Row>
      {title}: <span className="bold">{todayCritical + todayNiv}</span>,
      neinvazivno: <span className="bold">{todayNiv}</span>{' '}
      <span className="bold">
        <Brackets>{nivDelta}</Brackets>
      </span>
      , intubirani: <span className="bold">{todayCritical}</span>{' '}
      <span className="bold">
        <Brackets>{criticalDelta}</Brackets>
      </span>
    </Row>
  );
}

export default OnRespiratory;
