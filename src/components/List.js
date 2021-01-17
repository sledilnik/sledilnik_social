import React from 'react';

import format from 'date-fns/format';
import { sl } from 'date-fns/locale';
import _ from 'lodash';

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
  const hospitalsDict = prepareHospitalsDict(hospitalsList);

  // prepare perHospitalChanges
  const perHospitalChanges = getPerHospitalChanges(patients);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );

  /**
   * checks if data is not updated for the current day; if certain conditions are met then sets variable which represent error css class
   * TODO find better variable names?
   * ? implement -"red" +"error"
   * ? -summaryCheck(check_first) +???
   * ? -patientsCheck(check_second) +???
   * ? -statsCheck(check_third_age) +???
   * ? -municipalitiesCheck(check_third_mun) +???
   */
  const {
    check_first,
    check_second,
    check_third_age,
    check_third_mun,
  } = getChecks({ stats, municipalities, patients, summary });

  const introTodayDate = formatToLocaleDateString(new Date(), 'd.M.yyyy');

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
          perHospitalChanges={perHospitalChangesWithLongName}
        />
        <Outro />
      </section>
    </div>
  );
};
export default List;

const isUndefined = val => val === undefined;

// prepare hospitalsDict
function prepareHospitalsDict(hospitalsList) {
  return hospitalsList.map(hospital => [hospital.code, hospital.name]);
}

// prepare perHospitalChanges
function getPerHospitalChanges(patients) {
  const patientsData = _.last(patients);
  const patientsDataIsNotUndefined = !isUndefined(patientsData);
  return patientsDataIsNotUndefined && Object.entries(patientsData.facilities);
}

function findAndPushLongHospitalName(perHospitalChanges, hospitalsDict) {
  return perHospitalChanges.map(hospital => {
    const hospitalLongName = hospitalsDict.filter(
      item => hospital[0] === item[0]
    )[0][1];
    return [...hospital, hospitalLongName];
  });
}

// get date for Intro component
function formatToLocaleDateString(
  dateAsText = '',
  formatStr = 'd.M.yyyy',
  options = { locale: sl }
) {
  const date = new Date(dateAsText);
  return format(date, formatStr, options);
}

/**
 * get date with time 0:00:00; need to calculate if fetched data is not up to date
 * date received is part of an object with properties: year, month, day
 * at the moment we need to compare 4 dates from fetched data to today
 */
function getDateNoTime(obj) {
  // TODO error check?
  if (!obj) {
    const today = new Date();
    const todayArray = [today.getFullYear(), today.getMonth(), today.getDate()];
    return new Date(...todayArray);
  }

  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}

/**
 * paint red if data is not updated for the current day;
 * params <somethin>Check are used as className
 * TODO figure out if you can use date-fns
 */
function getChecks({ stats, municipalities, patients, summary }) {
  // data - no need to destructure summary while it's an object
  const patientsData = _.last(patients);
  const statsData = _.last(stats);
  const municipalitiesData = _.last(municipalities);

  // dates
  const todayDate = getDateNoTime();
  const patientsDate = getDateNoTime(patientsData);
  const statsDate = getDateNoTime(statsData);
  const municipalitiesDate = getDateNoTime(municipalitiesData);
  const summaryDate = getDateNoTime(summary.testsToday);

  const daysDifference = date1 => date2 => {
    const MILLISECONDS_DAY = 24 * 60 * 60 * 1000;
    return (date1 - date2) / MILLISECONDS_DAY;
  };
  const getDaysToToday = daysDifference(todayDate);

  const setClassName = (className = '') => condition =>
    condition ? className : '';
  const setRED = setClassName('red');

  const summaryCheck = setRED(getDaysToToday(summaryDate) === -1);
  const patientsCheck = setRED(getDaysToToday(patientsDate) > 0);
  const municipalitiesCheck = setRED(getDaysToToday(municipalitiesDate) > 1);

  const allToDateIsUndefined = isUndefined(
    _.get(_.nth(stats, -2), 'statePerAgeToDate[0].allToDate')
  );
  const statsCheck = setRED(
    (allToDateIsUndefined || getDaysToToday(statsDate)) > 0
  );

  return {
    check_first: summaryCheck,
    check_second: patientsCheck,
    check_third_age: statsCheck,
    check_third_mun: municipalitiesCheck,
  };
}
