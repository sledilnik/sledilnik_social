import React from 'react';

import Separator from './Separator';
import Translate from './Translate';
import TitleLine from './TitleLine';
import InOut from './InOut';

function PatientsLine({ check_second, patients, perHospitalChanges }) {
  const PersonsToday = ({ number, text }) => (
    <>
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      <Translate text={text} number={number}></Translate>{' '}
    </>
  );

  return (
    <span className={check_second}>
      <TitleLine title={'Stanje po bolnišnicah'} />
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
                    <PersonsToday
                      number={hosp[1].inHospital.today}
                      text={'oseba'}
                    />{' '}
                    <InOut
                      numIn={hosp[1].inHospital.in}
                      numOut={hosp[1].inHospital.out}
                      insideColons={true}
                    />
                    , EIT{' '}
                    <PersonsToday number={hosp[1].icu.today} text={'oseba'} />{' '}
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

export default PatientsLine;
