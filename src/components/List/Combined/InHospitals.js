import React from 'react';

import {
  Row,
  Bold,
  Brackets,
  LocaleNumberWithPlus,
  Text,
} from '../../shared/ui/New';
import DataTranslate from '../../shared/ui/DataTranslate';

function InHospitals({ check_second, title, patients, perHospitalChanges }) {
  const InHospital = ({
    hospShort,
    hospitalName,
    hosp = { number: 0, in: 0, out: 0 },
    icu = { number: 0, in: 0, out: 0 },
  }) => {
    return (
      <li key={hospShort}>
        <Bold>{hospitalName}</Bold>:{' '}
        <DataTranslate number={hosp.number} text={'oseba'} />{' '}
        <Bold>
          <Brackets>
            <LocaleNumberWithPlus number={hosp.in} />,{' '}
            <LocaleNumberWithPlus number={-hosp.out} />
          </Brackets>
        </Bold>
        <Text>, EIT: </Text>
        <DataTranslate number={icu.number} text={'oseba'} />{' '}
        <Bold>
          <Brackets>
            <LocaleNumberWithPlus number={icu.in} />,{' '}
            <LocaleNumberWithPlus number={-icu.out} />
          </Brackets>
        </Bold>
        <Text>.</Text>
      </li>
    );
  };

  const sortDescByPatients = (a, b) =>
    (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0);

  const createHospitalOutput = hosp => {
    const hospital = {
      number: hosp[1].inHospital.today,
      in: hosp[1].inHospital.in,
      out: hosp[1].inHospital.out,
    };
    const icu = {
      number: hosp[1].icu.today,
      in: hosp[1].icu.in,
      out: hosp[1].icu.out,
    };

    const noHospitalData = hosp[1].inHospital.today === undefined;

    return noHospitalData ? (
      ' - '
    ) : (
      <InHospital
        key={hosp[0]}
        hospShort={hosp[0]}
        hospitalName={hosp[2]}
        hosp={{ ...hospital }}
        icu={{ ...icu }}
      />
    );
  };

  const noPatientsData = patients[patients.length - 1] === undefined;

  const hospitalOutput = perHospitalChanges
    .sort(sortDescByPatients)
    .map(createHospitalOutput);

  return (
    <span className={check_second}>
      <Row end={false}>{title}: </Row>
      <ul>{noPatientsData ? 'NI PODATKOV' : hospitalOutput}</ul>
    </span>
  );
}

export default InHospitals;
