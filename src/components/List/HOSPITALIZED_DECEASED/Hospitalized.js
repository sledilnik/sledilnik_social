import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';

function Hospitalized({
  text,
  hospitalized,
  hospitalizedIn,
  hospitalizedOut,
  icuNum,
  icuDelta,
}) {
  const { title, subtitle1 } = text;
  const titleText = Object.values(title).join('');
  const subtitle1Text = Object.values(subtitle1).join('');
  return (
    <Row>
      {titleText}
      <span className="bold">{hospitalized}</span>
      <span className="bold">
        <Brackets>
          {hospitalizedIn}, {hospitalizedOut}
        </Brackets>
      </span>
      {subtitle1Text}
      <span className="bold">{icuNum}</span>
      <span className="bold">
        <Brackets>{icuDelta}</Brackets>
      </span>
    </Row>
  );
}

export default Hospitalized;
