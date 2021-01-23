import React from 'react';
import { Row, NoData } from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, check_stats }) {
  const title = 'Število cepljenih oseb';

  return (
    <>
      {toDate ? (
        <Row className={check_stats}>
          {title}: <span className="bold">{toDate}</span>{' '}
        </Row>
      ) : (
        <NoData className="text" html={{ tag: 'p', classes: 'bold red' }}>
          Ni vseh podatkov za cepljene osebe
        </NoData>
      )}
    </>
  );
}

export default Vaccination;
