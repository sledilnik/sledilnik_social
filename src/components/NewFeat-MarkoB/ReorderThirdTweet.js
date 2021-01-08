import React from 'react';

import PerAgeLine from '../PerAgeLine';
import MunicipalitiesLines from '../MunicipalitiesLines';
import PatientsLine from '../PatientsLine';

import Arrow from '../Arrow';
import Separator from '../Separator';
import FirstTweet from '../Tweets/FirstTweet';
import SecondTweet from '../Tweets/SecondTweet';

function ThirdTweetMarkoB({
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

  const ConfirmedLine = ({ number }) => (
    <>
      <Arrow /> Skupaj{' '}
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      potrjenih primerov.
    </>
  );

  return (
    <>
      <FirstTweet
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <ConfirmedLine number={stats[stats.length - 2].cases.confirmedToDate} />
      <br />
      <PerAgeLine
        check_third_age={check_third_age}
        todayPerAge={todayPerAge}
        yesterdayPerAge={yesterdayPerAge}
      />
      <SecondTweet
        check_second={check_second}
        stats={stats}
        patients={patients}
      />
      <div>
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

export default ThirdTweetMarkoB;
