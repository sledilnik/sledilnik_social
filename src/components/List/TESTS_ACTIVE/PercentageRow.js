import React from 'react';

import { Row } from '../../shared/ui/New';

function PercentageRow({
  title = '',
  numerator,
  denominator,
  percent,
  end = true,
}) {
  return (
    <Row end={end}>
      {title}: <span className="bold">{numerator}</span>, testiranih:{' '}
      <span className="bold">{denominator}</span>, delež pozitivnih:{' '}
      <span className="bold">{percent}</span>
    </Row>
  );
}

export default PercentageRow;
