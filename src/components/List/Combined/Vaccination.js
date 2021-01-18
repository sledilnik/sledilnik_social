import React from 'react';
import { Row, Brackets } from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, today }) {
  const title = 'Število cepljenih oseb';

  return (
    <Row>
      {title}: <span className="bold">{toDate}</span>{' '}
      <Brackets>
        <span className="bold">{today}</span>
      </Brackets>
    </Row>
  );
}

export default Vaccination;
