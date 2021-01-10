import React from 'react';

import DataRow from '../shared/DataRow';
import InOut from '../shared/InOut';
import DataTranslate from '../shared/DataTranslate';

function InHospitals({ check_second, patients, perHospitalChanges }) {
  return (
    <span className={check_second}>
      <DataRow title={'Stanje po bolnišnicah'} />
      <ul>
        {patients[patients.length - 1] === undefined
          ? 'NI PODATKOV'
          : perHospitalChanges
              .sort(
                (a, b) =>
                  (b[1].inHospital.today || 0) - (a[1].inHospital.today || 0)
              )
              .map(hosp => {
                return hosp[1].inHospital.today === undefined ? (
                  ''
                ) : (
                  <li key={hosp[0]}>
                    <span className="bold">{hosp[2]}</span>:{' '}
                    <DataTranslate
                      number={hosp[1].inHospital.today}
                      text={'oseba'}
                    />{' '}
                    <InOut
                      numIn={hosp[1].inHospital.in}
                      numOut={hosp[1].inHospital.out}
                      insideColons={true}
                    />
                    , EIT{' '}
                    <DataTranslate number={hosp[1].icu.today} text={'oseba'} />{' '}
                    <InOut
                      numIn={hosp[1].icu.in}
                      numOut={hosp[1].icu.out}
                      insideColons={true}
                    />
                    .
                  </li>
                );
              })}
      </ul>
    </span>
  );
}

export default InHospitals;
