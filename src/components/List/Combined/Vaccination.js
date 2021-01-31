import React from 'react';
import { Row, Emoji } from '../../shared/ui/New';

// ? rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, toDate2, check_stats }) {
  const title = 'Cepljenih oseb';

  return (
    <Row className={check_stats}>
      {title}: <Emoji emoji={'💉'} ariaLabel="one dose" />
      <span className="bold">{toDate}</span>,{' '}
      <Emoji emoji={'💉💉'} ariaLabel="two doses" />
      <span className="bold">{toDate2}</span>
    </Row>
  );
}

export default Vaccination;
