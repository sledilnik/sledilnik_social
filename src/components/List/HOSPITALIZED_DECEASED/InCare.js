import React from 'react';
import { Row, Brackets } from '../../shared/ui/New';

function InCare({ title, careNum, careIn, careOut }) {
  console.log({ title, careNum, careIn, careOut });
  // -> Negovalne bolnišnice: 103 (+3, -1)
  return (
    <Row>
      {title}: <span className="bold">{careNum}</span>{' '}
      <span className="bold">
        <Brackets>
          {careIn}, {careOut}
        </Brackets>
      </span>
    </Row>
  );
}

export default InCare;
