import React from 'react';
import {
  Row,
  Text,
  Bold,
  LocaleNumberWithPlus,
  LocaleNumber,
  Brackets,
} from '../../shared/ui/New';

// TODO rename toDate -> vaccinated, today -> vaccinatedToday
function Vaccination({ toDate, today }) {
  const title = 'Število cepljenih oseb';

  return (
    <Row>
      <Text>{title} </Text>
      <Bold>
        <LocaleNumber number={toDate} />
      </Bold>{' '}
      <Brackets>
        <Bold>
          <LocaleNumberWithPlus number={today} />
        </Bold>
      </Brackets>
    </Row>
  );
}

export default Vaccination;
