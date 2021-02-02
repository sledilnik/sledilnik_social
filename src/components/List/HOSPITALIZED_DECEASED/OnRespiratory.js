import React from 'react';
import { Row, Brackets } from '../../shared/ui/New';

function OnRespiratory({
  text,
  respiratoryTotal,
  todayCritical,
  criticalDelta,
  todayNiv,
  nivDelta,
}) {
  const { title, subtitle1, subtitle2 } = text;
  const titleText = Object.values(title).join('');
  const subtitle1Text = Object.values(subtitle1).join('');
  const subtitle2Text = Object.values(subtitle2).join('');
  // -> Na respiratorju: 144, neinvazivno: 12 (-1), intubirani: 132 (-2)
  return (
    <Row>
      {titleText}
      <span className="bold">{respiratoryTotal}</span>
      {subtitle1Text}
      <span className="bold">{todayCritical}</span>
      <span className="bold">
        <Brackets>{criticalDelta}</Brackets>
      </span>
      {subtitle2Text}
      <span className="bold">{todayNiv}</span>
      <span className="bold">
        <Brackets>{nivDelta}</Brackets>
      </span>
    </Row>
  );
}

export default OnRespiratory;
