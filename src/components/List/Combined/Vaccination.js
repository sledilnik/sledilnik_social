import React from 'react';
import { Row, Brackets, NoData } from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, today, check_stats }) {
  const title = 'Število cepljenih oseb';

  const noData = !isNaN(today) || !isNaN(toDate);

  return (
    <>
      {noData ? (
        <Row className={check_stats}>
          {title}: <span className="bold">{toDate}</span>{' '}
          <Brackets>
            <span className="bold">{today}</span>
          </Brackets>
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
