import React from 'react';
import Arrow from '../Arrow';
import Delta from '../Delta';
import Separator from '../Separator';
import Translate from '../Translate';
import Municipalities from '../Municipalities';
import Outro from '../Outro';

function ThirdTweet({
  check_second,
  check_third_age,
  check_third_mun,
  stats,
  patients,
  municipalities,
  perHospitalChanges,
}) {
  const todayArray = stats[stats.length - 2].statePerAgeToDate;
  const yesterdayArray = stats[stats.length - 3].statePerAgeToDate;
  const deltas = [];

  // index is not good for key
  for (let i = 0; i < 10; i++) {
    const { ageFrom, ageTo } = todayArray[i];
    const today = todayArray[i].allToDate;
    const yesterday = yesterdayArray[i].allToDate;
    const _delta = (
      <span key={i}>
        {' '}
        {ageFrom}-{ageTo} (
        <Delta today={today} yesterday={yesterday} />){i !== 9 ? ',' : ''}
      </span>
    );
    deltas.push(_delta);
  }

  return (
    <div>
      <span className={check_third_age}>
        <p className="text">
          <Arrow /> Potrjeni primeri po starosti:{deltas}.
        </p>
      </span>
      <span className={check_second}>
        <p className="text">
          <Arrow /> Stanje po bolnišnicah:
        </p>
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
                        <span className="bold">
                          <Separator number={hosp[1].inHospital.today} />
                        </span>{' '}
                        <Translate
                          text={'oseba'}
                          number={hosp[1].inHospital.today}
                        ></Translate>{' '}
                        (
                        <span className="bold">
                          +<Separator number={hosp[1].inHospital.in} /> -
                          <Separator number={hosp[1].inHospital.out} />
                        </span>
                        ), EIT{' '}
                        <span className="bold">
                          <Separator number={hosp[1].icu.today} />
                        </span>{' '}
                        <Translate
                          text={'oseba'}
                          number={hosp[1].icu.today}
                        ></Translate>{' '}
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

      <span className={check_third_mun}>
        <p className="text">
          <Arrow /> Po krajih:
        </p>
        <ul className="municipalities">
          <Municipalities
            data={municipalities}
            showTrend="y"
            icons="FB"
          ></Municipalities>
        </ul>
        <Outro />
        <br />
        <br />
        <p className="text">
          <Arrow /> Po krajih:
        </p>
        <ul className="municipalities">
          <Municipalities
            data={municipalities}
            showTrend="y"
            icons="TW"
          ></Municipalities>
        </ul>
      </span>
    </div>
  );
}

export default ThirdTweet;
