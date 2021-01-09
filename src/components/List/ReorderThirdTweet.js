import React from 'react';

import PerAge from './shared/PerAge';
import Cities_SocialFriendly from './shared/Cities_SocialFriendly';
import InHospitals from './shared/InHospitals';

import Arrow from './shared/Arrow';
import Separator from './shared/Separator';
import TESTS_ACTIVE from '../shared/TESTS_ACTIVE';
import SecondTweet from '../shared/SecondTweet';
import InOut from './shared/InOut';

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
      <TESTS_ACTIVE
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <p className="text">
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
      </p>
      <p className="text">
        <DataLinePart
          number={stats[stats.length - 2].cases.confirmedToDate}
          prefix={'Skupaj'}
          suffix={'potrjenih primerov'}
        />
        .
      </p>
      <PerAge
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
        <InHospitals
          check_second={check_second}
          patients={patients}
          perHospitalChanges={perHospitalChanges}
        />
        .
        <Cities_SocialFriendly
          check_third_mun={check_third_mun}
          municipalities={municipalities}
        />
      </div>
    </>
  );
}

export default ThirdTweetMarkoB;
