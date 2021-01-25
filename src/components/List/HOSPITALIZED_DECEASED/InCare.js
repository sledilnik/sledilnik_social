import React from 'react';
import { Row, Brackets, NoData } from '../../shared/ui/New';

function InCare({ title, careNum, careIn, careOut }) {
  const isUndefined = value => value === undefined;
  const noData =
    isUndefined(careNum) || isUndefined(careIn) || isUndefined(careOut);

  // -> Negovalne bolnišnice: 103 (+3, -1)
  return (
    <Row end={false} className={noData && 'red'}>
      {title}:
      <>
        <span className="bold">{careNum}</span>
        <span className="bold">
          <Brackets>
            {careIn},{careOut}
          </Brackets>
        </span>
      </>
    </Row>
  );
}

export default InCare;
