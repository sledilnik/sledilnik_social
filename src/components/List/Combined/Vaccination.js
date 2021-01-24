import React from 'react';
import { Row } from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, toDate2, check_stats }) {
  const title = 'Število cepljenih oseb';

  return (
    <Row className={check_stats}>
      {title}: 1: <span className="bold">{toDate}</span>, 2:{' '}
      <span className="bold">{toDate2}</span>
    </Row>
  );
}

export default Vaccination;
