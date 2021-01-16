import React from 'react';

import format from 'date-fns/format';
import { sl } from 'date-fns/locale';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import Combined from './List/Combined';

import './List.css';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';

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

  // TODO find better variable names
  const {
    check_first,
    check_second,
    check_third_age,
    check_third_mun,
  } = getChecks({ stats, municipalities, patients, summary });

  const introTodayDate = formatToLocaleDateString('d.M.yyyy')(new Date());

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

function formatToLocaleDateString(
  formatStr = "E, d. MMM yyyy 'ob' H.mm",
  options = { locale: sl }
) {
  return dateAsText => {
    const date = new Date(dateAsText);
    return format(date, formatStr, options);
  };
}

function getDateNoTime(obj) {
  // TODO error check
  if (!obj) {
    const today = new Date();
    const todayArray = [today.getFullYear(), today.getMonth(), today.getDate()];
    return new Date(...todayArray);
  }

  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}

function getChecks({ stats, municipalities, patients, summary }) {
  // data - no need for summary while it's an object
  const patientsData = patients[patients.length - 1];
  const statsData = stats[stats.length - 1];
  const municipalitiesData = municipalities[municipalities.length - 1];

  // my datestamps
  const todayDate = getDateNoTime();
  const patientsDate = getDateNoTime(patientsData);
  const statsDate = getDateNoTime(statsData);
  const municipalitiesDate = getDateNoTime(municipalitiesData);
  const summaryDate = getDateNoTime(summary.testsToday);

  // paint red if data is not updated for the current day
  var summaryCheck = '';
  var patientsCheck = '';
  var statsCheck = '';
  var municipalitiesCheck = '';

  const daysDifference = date1 => date2 => {
    const MILLISECONDS_DAY = 24 * 60 * 60 * 1000;
    return (date1 - date2) / MILLISECONDS_DAY;
  };

  const differenceInDays = daysDifference(todayDate);

  if (differenceInDays(summaryDate) === -1) {
    summaryCheck = 'red';
  }

  const todayDateOld = parseInt(
    new Date().getFullYear().toString() +
      (new Date().getMonth() + 1).toString() +
      new Date().getDate().toString()
  );

  const statsDateOld =
    stats[stats.length - 1].year.toString() +
    stats[stats.length - 1].month.toString() +
    stats[stats.length - 1].day.toString();

  console.log(
    differenceInDays(patientsDate),
    { todayDateOld, statsDateOld },
    todayDateOld - statsDateOld
  );

  if (differenceInDays(patientsDate) > 0) {
    patientsCheck = 'red';
  }

  const isUndefined = val => val === undefined;
  const allToDateIsUndefined = isUndefined(
    stats[stats.length - 2].statePerAgeToDate[0].allToDate
  );

  if (allToDateIsUndefined || differenceInDays(statsDate) > 0) {
    statsCheck = 'red';
  }

  if (differenceInDays(municipalitiesDate) > 1) {
    municipalitiesCheck = 'red';
  }

  return {
    check_first: summaryCheck,
    check_second: patientsCheck,
    check_third_age: statsCheck,
    check_third_mun: municipalitiesCheck,
  };
}
