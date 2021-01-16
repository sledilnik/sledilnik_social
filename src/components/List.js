import React from 'react';
import format from 'date-fns/format';
import { sl } from 'date-fns/locale';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import Combined from './List/Combined';

import './List.css';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';

const formatToLocaleDateString = (
  formatStr = "E, d. MMM yyyy 'ob' H.mm",
  options = { locale: sl }
) => dateAsText => {
  const date = new Date(dateAsText);
  return format(date, formatStr, options);
};

const List = props => {
  const { stats } = props;
  const { municipalities } = props;
  const { patients } = props;
  const { labTests } = props;
  const { summary } = props;

  if (!stats || stats.length === 0)
    return <p>Napaka: API ne vrača podatkov, refresh page !!!</p>;

  // prepare hospitalsDict
  const { hospitalsList } = props;
  let hospitalsDict = [];
  for (let i = 0; i < hospitalsList.length; i++) {
    hospitalsDict.push([hospitalsList[i].code, hospitalsList[i].name]);
  }

  // prepare perHospitalChanges
  const perHospitalChanges =
    patients[patients.length - 1] === undefined
      ? 'NI PODATKOV'
      : Object.entries(patients[patients.length - 1].facilities);
  for (let i = 0; i < perHospitalChanges.length; i++) {
    for (let j = 0; j < hospitalsDict.length; j++) {
      if (perHospitalChanges[i][0] === hospitalsDict[j][0]) {
        perHospitalChanges[i].push(hospitalsDict[j][1]);
      }
    }
  }

  // const datestamps
  const todayDate = parseInt(
    new Date().getFullYear().toString() +
      (new Date().getMonth() + 1).toString() +
      new Date().getDate().toString()
  );

  const patientsDate =
    patients[patients.length - 1].year.toString() +
    patients[patients.length - 1].month.toString() +
    patients[patients.length - 1].day.toString();
  const statsDate =
    stats[stats.length - 1].year.toString() +
    stats[stats.length - 1].month.toString() +
    stats[stats.length - 1].day.toString();
  const municipalitiesDate = parseInt(
    municipalities[municipalities.length - 1].year.toString() +
      municipalities[municipalities.length - 1].month.toString() +
      municipalities[municipalities.length - 1].day.toString()
  );
  const summaryDate =
    summary.testsToday.year.toString() +
    summary.testsToday.month.toString() +
    summary.testsToday.day.toString();

  let introTodayDate = formatToLocaleDateString('d.M.yyyy')(new Date());

  // paint red if data is not updated for the current day
  var check_first = '';
  var check_second = '';
  var check_third_age = '';
  var check_third_mun = '';

  if (todayDate - summaryDate === -1) {
    check_first = 'red';
  }
  if (todayDate - patientsDate > 0) {
    check_second = 'red';
  }
  if (
    stats[stats.length - 2].statePerAgeToDate[0].allToDate === undefined ||
    todayDate - statsDate > 0
  ) {
    check_third_age = 'red';
  }
  if (true) {
  }
  if (todayDate - municipalitiesDate > 1) {
    check_third_mun = 'red';
  }

  return (
    <div className="List">
      <section className="tweet">
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE
          check_first={check_first}
          labTests={labTests}
          summary={summary}
        />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED
          check_second={check_second}
          stats={stats}
          patients={patients}
        />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={3} introTodayDate={introTodayDate} />
        <Combined
          check_first={check_first}
          check_second={check_second}
          check_third_age={check_third_age}
          check_third_mun={check_third_mun}
          labTests={labTests}
          summary={summary}
          stats={stats}
          patients={patients}
          municipalities={municipalities}
          perHospitalChanges={perHospitalChanges}
        />
        <Outro />
      </section>
    </div>
  );
};
export default List;
