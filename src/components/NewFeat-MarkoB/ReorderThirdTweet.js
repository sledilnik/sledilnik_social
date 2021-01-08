import React from 'react';

import PerAgeLine from '../PerAgeLine';
import MunicipalitiesLines from '../MunicipalitiesLines';
import PatientsLine from '../PatientsLine';

import Arrow from '../Arrow';
import Separator from '../Separator';
import FirstTweet from '../Tweets/FirstTweet';
import SecondTweet from '../Tweets/SecondTweet';
import InOut from '../InOut';

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

  const DataLinePart = ({
    number,
    prefix,
    suffix,
    noArrow = false,
    insideColons = false,
  }) => (
    <>
      {insideColons ? '(' : ''}
      {noArrow ? '' : <Arrow />} {prefix}{' '}
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      {suffix}
      {insideColons ? ')' : ''}
    </>
  );

  return (
    <>
      <FirstTweet
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
        <DataLinePart
          number={stats[stats.length - 2].vaccination.administered.toDate}
          prefix={'Število cepljenih oseb:'}
          suffix={' '}
        />
        <InOut
          numIn={stats[stats.length - 2].vaccination.administered.today}
          insideColons={true}
        />
        .
        <DataLinePart
          number={stats[stats.length - 2].cases.confirmedToDate}
          prefix={'Skupaj'}
          suffix={'potrjenih primerov'}
        />
        .
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
