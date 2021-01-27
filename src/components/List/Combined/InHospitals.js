import React from 'react';

import { Row, Brackets } from '../../shared/ui/New';
import DataTranslate from '../../shared/ui/DataTranslate';
import {
  formatNumber,
  formatNumberWithSign,
} from '../../../utils/formatNumber';

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
    const { inHospital, icu } = hosp[1];

    // we want to display property 'out' as negative number
    const negHospOut = -inHospital.out;
    const negIcuOut = -icu.out;

    const formattedInHospital = {
      number: isNaN(inHospital.today) ? '-' : formatNumber(inHospital.today),
      in: isNaN(inHospital.in) ? '-' : formatNumberWithSign(inHospital.in),
      out: isNaN(negHospOut) ? '-' : formatNumberWithSign(negHospOut),
    };
    const foramttedIcu = {
      number: isNaN(icu.today) ? '-' : formatNumber(icu.today),
      in: isNaN(icu.in) ? '-' : formatNumberWithSign(icu.in),
      out: isNaN(negIcuOut) ? '-' : formatNumberWithSign(negIcuOut),
    };

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

  // TODO we can check in parent component
  const noPatientsData = patients.slice(-1)[0] === undefined;

  const hospitalOutput = perHospitalChanges
    .sort(sortDescByPatients)
    .map(createHospitalOutput);

  return (
    <Row className={check_patients} end={false}>
      {title}: <ul>{noPatientsData ? 'NI PODATKOV' : hospitalOutput}</ul>
    </Row>
  );
}

export default InHospitals;
