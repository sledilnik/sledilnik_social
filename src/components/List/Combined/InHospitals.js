import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';
import DataTranslate from '../../shared/ui/DataTranslate';
import {
  formatNumber,
  alwaysSignDisplay,
} from '../../../utils/createLocaleNumberFormat';

function InHospital({ hospShort, hospitalName, hosp, icu }) {
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
}

function InHospitals({ check_patients, title, patients, perHospitalChanges }) {
  const sortDescByPatients = (a, b) =>
    (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0);

  const createHospitalOutput = hosp => {
    const hospital = hosp[1];

    const { inHospital, icu } = hospital;

    const formattedInHospital = {
      number: isNaN(inHospital.today) ? '-' : formatNumber(inHospital.today),
      in: isNaN(inHospital.in) ? '-' : alwaysSignDisplay(inHospital.in),
      out: isNaN(inHospital.out) ? '-' : alwaysSignDisplay(-inHospital.out),
    };
    const foramttedIcu = {
      number: isNaN(icu.today) ? '-' : formatNumber(icu.today),
      in: isNaN(icu.in) ? '-' : alwaysSignDisplay(icu.in),
      out: isNaN(icu.out) ? '-' : alwaysSignDisplay(-icu.out),
    };

    console.log({ hospital: inHospital, icu });

    const noHospitalData = hosp[1].inHospital.today === undefined;

    return noHospitalData ? (
      ''
    ) : (
      <InHospital
        key={hosp[0]}
        hospShort={hosp[0]}
        hospitalName={hosp[2]}
        hosp={{ ...formattedInHospital }}
        icu={{ ...foramttedIcu }}
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
