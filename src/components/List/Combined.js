import React from 'react';

import PerAge from './Combined/PerAge';
import CITIES_SOCIALFRIENDLY from './Combined/CITIES_SOCIALFRIENDLY';
import InHospitals from './Combined/InHospitals';
import TESTS_ACTIVE from '../shared/TESTS_ACTIVE';
import Separator from './shared/Separator';
import HOSPITALIZED_DECEASED from '../shared/HOSPITALIZED_DECEASED';
import InOut from './shared/InOut';
import TitleLine from './shared/TitleLine';

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

  const vaccinationToDate =
    stats[stats.length - 2].vaccination.administered.toDate;
  const vaccinationToday =
    stats[stats.length - 2].vaccination.administered.today;

  const confirmedToDate = stats[stats.length - 2].cases.confirmedToDate;

  const Data = ({ number, prefix, suffix }) => (
    <>
      {prefix}{' '}
      <span className="bold">
        <Separator number={number} />
      </span>{' '}
      {suffix}
    </>
  );

  function Vaccination({ toDate, today }) {
    return (
      <TitleLine title={'Število cepljenih oseb'}>
        <Data number={toDate} />
        <InOut numIn={today} insideColons={true} />.
      </TitleLine>
    );
  }

  function Confirmed({ toDate }) {
    return (
      <TitleLine>
        <Data number={toDate} prefix={'Skupaj'} suffix={'potrjenih primerov'} />
        .
      </TitleLine>
    );
  }

  return (
    <>
      <TESTS_ACTIVE
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <Vaccination toDate={vaccinationToDate} today={vaccinationToday} />
      <Confirmed toDate={confirmedToDate} />
      <PerAge
        check_third_age={check_third_age}
        todayPerAge={todayPerAge}
        yesterdayPerAge={yesterdayPerAge}
      />
      <HOSPITALIZED_DECEASED
        check_second={check_second}
        stats={stats}
        patients={patients}
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
    </>
  );
}

export default Combined;
