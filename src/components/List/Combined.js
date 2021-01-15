import React from 'react';

import TESTS_ACTIVE from './TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './HOSPITALIZED_DECEASED';
import CITIES_SOCIALFRIENDLY from './Combined/CITIES_SOCIALFRIENDLY';
import PerAge from './Combined/PerAge';
import InHospitals from './Combined/InHospitals';

import Arrow from './../shared/ui/Arrow';
import DataRow from './../shared/ui/DataRow';
import EmbeddedNumber from './../shared/ui/EmbeddedNumber';
import EmbeddedNumberInOut from './../shared/ui/EmbeddedNumberInOut';

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
              inBrackets={true}
            />
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
      </DataRow>
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
