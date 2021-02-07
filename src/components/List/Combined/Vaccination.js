import React from 'react';
import { Row, Emoji } from '../../shared/ui/New';

function Vaccination({ firstVaccination, secondVaccination, check_stats }) {
  const title = 'Cepljenih oseb';

  return (
    <Row className={check_stats}>
      {title}: <Emoji emoji={'💉'} ariaLabel="one dose" />
      <span className="bold">{firstVaccination}</span>,{' '}
      <Emoji emoji={'💉💉'} ariaLabel="two doses" />
      <span className="bold">{secondVaccination}</span>
    </Row>
  );
}

export default Vaccination;
