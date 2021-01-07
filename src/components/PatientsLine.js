import React from 'react';

import Arrow from './Arrow';
import Separator from './Separator';
import Translate from './Translate';

function PatientsLine({ check_second, patients, perHospitalChanges }) {
  const PersonsToday = ({ number, text }) => (
    <>
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      <Translate text={text} number={number}></Translate>{' '}
    </>
  );

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
                    <span>
                      <span className="bold">{hosp[2]}</span>:{' '}
                      <PersonsToday
                        number={hosp[1].inHospital.today}
                        text={'oseba'}
                      />{' '}
                      (
                      <span className="bold">
                        +<Separator number={hosp[1].inHospital.in} /> -
                        <Separator number={hosp[1].inHospital.out} />
                      </span>
                      ), EIT{' '}
                      <PersonsToday number={hosp[1].icu.today} text={'oseba'} />{' '}
                      (
                      <span className="bold">
                        +
                        <Separator number={hosp[1].icu.in} /> -
                        <Separator number={hosp[1].icu.out} />
                      </span>
                      ).
                    </span>
                    <br />
                  </li>
                );
              })}
      </ul>
    </span>
  );
}

export default PatientsLine;
