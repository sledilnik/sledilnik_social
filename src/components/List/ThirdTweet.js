import React from 'react';

import PerAge from './shared/PerAge';
import CITIES_SOCIALFRIENDLY from './shared/CITIES_SOCIALFRIENDLY';
import InHospitals from './shared/InHospitals';
import TESTS_ACTIVE from '../shared/TESTS_ACTIVE';
import Arrow from './shared/Arrow';
import Separator from './shared/Separator';
import SecondTweet from '../shared/SecondTweet';

function ThirdTweet({
  check_first,
  check_second,
  check_third_age,
  check_third_mun,
  stats,
  labTests,
  summary,
  patients,
  municipalities,
  perHospitalChanges,
}) {
  const todayPerAge = stats[stats.length - 2].statePerAgeToDate;
  const yesterdayPerAge = stats[stats.length - 3].statePerAgeToDate;

  return (
    <>
      <TESTS_ACTIVE
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <Arrow /> Skupaj{' '}
      <span className="bold">
        <Separator number={stats[stats.length - 2].cases.confirmedToDate} />
      </span>{' '}
      potrjenih primerov.
      <SecondTweet
        check_second={check_second}
        stats={stats}
        patients={patients}
      />
      <div>
        <PerAge
          check_third_age={check_third_age}
          todayPerAge={todayPerAge}
          yesterdayPerAge={yesterdayPerAge}
        />
        <InHospitals
          check_second={check_second}
          patients={patients}
          perHospitalChanges={perHospitalChanges}
        />
        <CITIES_SOCIALFRIENDLY
          check_third_mun={check_third_mun}
          municipalities={municipalities}
        />
      </div>
    </>
  );
}

export default ThirdTweet;
