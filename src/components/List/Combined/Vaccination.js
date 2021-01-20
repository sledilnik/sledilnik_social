import React from 'react';
import { Row, Brackets } from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, today, check_stats }) {
  const title = 'Število cepljenih oseb';

  return (
    <Row className={check_stats}>
      {title}: <span className="bold">{toDate}</span>{' '}
      <Brackets>
        <span className="bold">{today}</span>
      </Brackets>
    </Row>
  );
}

export default Vaccination;
