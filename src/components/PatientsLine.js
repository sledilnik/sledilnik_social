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

  const InOut = ({ numPositive, numNegative }) => (
    <span className="bold">
      +<Separator number={numPositive} /> -<Separator number={numNegative} />
    </span>
  );

  const TitleLine = ({ children, title }) => (
    <p className="text">
      <Arrow /> {title}: {children}
    </p>
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
                    <span>
                      <span className="bold">{hosp[2]}</span>:{' '}
                      <PersonsToday
                        number={hosp[1].inHospital.today}
                        text={'oseba'}
                      />{' '}
                      (
                      <InOut
                        numPositive={hosp[1].inHospital.in}
                        numNegative={hosp[1].inHospital.out}
                      />
                      ), EIT{' '}
                      <PersonsToday number={hosp[1].icu.today} text={'oseba'} />{' '}
                      (
                      <InOut
                        numPositive={hosp[1].icu.in}
                        numNegative={hosp[1].icu.out}
                      />
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
