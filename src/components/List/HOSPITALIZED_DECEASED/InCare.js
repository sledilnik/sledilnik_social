import React from 'react';
import { Row, Brackets, NoData } from '../../shared/ui/New';

function InCare({ title, careNum, careIn, careOut }) {
  const noData = !isNaN(careNum) && !isNaN(careIn) && !isNaN(careOut);
  // -> Negovalne bolnišnice: 103 (+3, -1)
  return (
    <Row className={noData && 'red'}>
      {title}:{' '}
      {noData ? (
        <NoData html={{ classes: 'bold' }}>ni vseh podatkov</NoData>
      ) : (
        <>
          <span className="bold">{careNum}</span>{' '}
          <span className="bold">
            <Brackets>
              {careIn}, {careOut}
            </Brackets>
          </span>
        </>
      )}
    </Row>
  );
}

export default InCare;
