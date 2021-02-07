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
  const { title, subtitle1, spaces } = text;
  const titleText = Object.values(title).join('');
  const subtitle1Text = Object.values(subtitle1).join('');
  const space = spaces && ' ';
  return (
    <Row>
      {titleText}
      <span className="bold">{hospitalized}</span>
      {space}
      <span className="bold">
        <Brackets>
          {hospitalizedIn}, {hospitalizedOut}
        </Brackets>
      </span>
      {subtitle1Text}
      <span className="bold">{icuNum}</span>
      {space}
      <span className="bold">
        <Brackets>{icuDelta}</Brackets>
      </span>
    </Row>
  );
}

export default Hospitalized;
