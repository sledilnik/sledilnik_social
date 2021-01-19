import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';
import DataTranslate from '../../shared/ui/DataTranslate';
import {
  formatNumber,
  alwaysSignDisplay,
} from '../../../utils/createLocaleNumberFormat';

function InHospitals({ check_patients, title, patients, perHospitalChanges }) {
  const InHospital = ({
    hospShort,
    hospitalName,
    hosp = { number: 0, in: 0, out: 0 },
    icu = { number: 0, in: 0, out: 0 },
  }) => {
    return (
      <li key={hospShort}>
        <span className="bold">{hospitalName}</span>:{' '}
        <DataTranslate number={hosp.number} text={'oseba'} />{' '}
        <span className="bold">
          <Brackets>
            {hosp.in}, {hosp.out}
          </Brackets>
        </span>
        , EIT:
        <DataTranslate number={icu.number} text={'oseba'} />{' '}
        <span className="bold">
          <Brackets>
            {icu.in}, {icu.out}
          </Brackets>
        </span>
        .
      </li>
    );
  };

  const sortDescByPatients = (a, b) =>
    (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0);

  const createHospitalOutput = hosp => {
    const hospital = {
      number: formatNumber(hosp[1].inHospital.today),
      in: alwaysSignDisplay(hosp[1].inHospital.in),
      out: alwaysSignDisplay(-hosp[1].inHospital.out),
    };
    const icu = {
      number: formatNumber(hosp[1].icu.today),
      in: alwaysSignDisplay(hosp[1].icu.in),
      out: alwaysSignDisplay(-hosp[1].icu.out),
    };

    const noHospitalData = hosp[1].inHospital.today === undefined;

    return noHospitalData ? (
      ''
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
    <span className={check_patients}>
      <Row end={false}>{title}: </Row>
      <ul>{noPatientsData ? 'NI PODATKOV' : hospitalOutput}</ul>
    </span>
  );
}

export default InHospitals;
