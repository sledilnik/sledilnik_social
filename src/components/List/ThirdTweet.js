import React from 'react';

import PerAgeLine from './shared/PerAgeLine';
import MunicipalitiesLines from './shared/Cities_SocialFriendly';
import PatientsLine from './shared/PatientsLine';
import FirstTweet from '../shared/FirstTweet';
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
      <FirstTweet
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
        <PerAgeLine
          check_third_age={check_third_age}
          todayPerAge={todayPerAge}
          yesterdayPerAge={yesterdayPerAge}
        />
        <PatientsLine
          check_second={check_second}
          patients={patients}
          perHospitalChanges={perHospitalChanges}
        />
        <MunicipalitiesLines
          check_third_mun={check_third_mun}
          municipalities={municipalities}
        />
      </div>
    </>
  );
}

export default ThirdTweet;
