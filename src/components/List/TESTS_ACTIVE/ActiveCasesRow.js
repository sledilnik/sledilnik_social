import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';

// TODO params: isUndefined, isNull?
function ActiveCasesRow({ casesActive, casesActiveIn, casesActiveOut }) {
  return (
    <Row>
      Aktivni primeri:{' '}
      <span className="bold">
        {casesActive}{' '}
        <Brackets>
          {casesActiveIn}, {-casesActiveOut}
        </Brackets>
      </span>
    </Row>
  );
}

export default ActiveCasesRow;
