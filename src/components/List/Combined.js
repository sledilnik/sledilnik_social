import React from 'react';

import PerAge from './Combined/PerAge';
import CITIES_SOCIALFRIENDLY from './Combined/CITIES_SOCIALFRIENDLY';
import InHospitals from './Combined/InHospitals';
import TESTS_ACTIVE from '../shared/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from '../shared/HOSPITALIZED_DECEASED';
import DataRow from './shared/DataRow';
import EmbeddedNumber from './shared/EmbeddedNumber';
import EmbeddedNumberInOut from './shared/EmbeddedNumberInOut';
import Arrow from './shared/Arrow';

const isUndefined = value => value === undefined;

const isOneArgumentUndefined = (values = {}) => {
  let result = false;
  for (const [key, value] of Object.entries(values)) {
    const valueIsUndefined = isUndefined(value);
    if (valueIsUndefined) {
      console.warn(`Argument: ${key} is undefined!`);
      result = true;
    }
  }
  return result;
};

function NoData({ text, html = { tag: 'span', classes: '' } }) {
  if (html.tag === 'span') {
    return <span className={html.classes}>{text}</span>;
  }
  if (html.tag === 'p') {
    return (
      <p className={html.classes}>
        <Arrow /> {text}
      </p>
    );
  }
  return;
}

function Combined({
  check_first,
  check_second,
  check_third_age,
  check_third_mun,
  check_lab_tests,
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

  function Vaccination({ toDate, today }) {
    const showNoData = isOneArgumentUndefined({ toDate, today });
    const title = 'Število cepljenih oseb';

    return (
      <>
        {showNoData ? (
          <NoData
            text={'Ni vseh podatkov za cepljene osebe.'}
            html={{ classes: 'text', tag: 'p' }}
          />
        ) : (
          <DataRow title={title}>
            <EmbeddedNumberInOut
              suffix={' '}
              number={toDate}
              numIn={today}
              insideColons={true}
            />
            .
          </DataRow>
        )}
      </>
    );
  }

  function Confirmed({ toDate }) {
    return (
      <DataRow>
        <EmbeddedNumber
          number={toDate}
          prefix={'Skupaj '}
          suffix={' potrjenih primerov'}
        />
        .
      </DataRow>
    );
  }

  return (
    <>
      <TESTS_ACTIVE
        check_first={check_first}
        check_lab_tests={check_lab_tests}
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
