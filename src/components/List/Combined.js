import React from 'react';

import PerAge from './shared/PerAge';
import CITIES_SOCIALFRIENDLY from './shared/CITIES_SOCIALFRIENDLY';
import InHospitals from './shared/InHospitals';
import TESTS_ACTIVE from '../shared/TESTS_ACTIVE';
import Arrow from './shared/Arrow';
import Separator from './shared/Separator';
import SecondTweet from '../shared/SecondTweet';
import InOut from './shared/InOut';

function Combined({
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

  function Vaccination({ toDate, today }) {
    return (
      <p className="text">
        <DataLinePart
          number={toDate}
          prefix={'Število cepljenih oseb:'}
          suffix={' '}
        />
        <InOut numIn={today} insideColons={true} />.
      </p>
    );
  }

  function Confirmed({ toDate }) {
    return (
      <p className="text">
        <DataLinePart
          number={stats[stats.length - 2].cases.confirmedToDate}
          prefix={'Skupaj'}
          suffix={'potrjenih primerov'}
        />
        .
      </p>
    );
  }

  return (
    <>
      <TESTS_ACTIVE
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <Vaccination
        toDate={stats[stats.length - 2].vaccination.administered.toDate}
        today={stats[stats.length - 2].vaccination.administered.today}
      />
      <Confirmed toDate={stats[stats.length - 2].cases.confirmedToDate} />
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
        <CITIES_SOCIALFRIENDLY
          check_third_mun={check_third_mun}
          municipalities={municipalities}
        />
      </div>
    </>
  );
}

export default Combined;
