import React from 'react';

import './List.css';

import format from 'date-fns/format';
import { sl } from 'date-fns/locale';
import differenceInDays from 'date-fns/differenceInDays';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';
import Combined from './List/Combined';

const List = ({
  statsHook,
  patientsHook,
  municipalitiesHook,
  hospitalsListHook,
  labTestsHook,
  summaryHook,
}) => {
  const introTodayDate = formatToLocaleDateString(new Date(), 'd.M.yyyy');

  return (
    <div className="List">
      <section className="tweet">
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE labTestsHook={labTestsHook} summaryHook={summaryHook} />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED patientsHook={patientsHook} />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={3} introTodayDate={introTodayDate} />
        <Combined
          statsHook={statsHook}
          summaryHook={summaryHook}
          patientsHook={patientsHook}
          labTestsHook={labTestsHook}
          municipalitiesHook={municipalitiesHook}
          hospitalsListHook={hospitalsListHook}
        />
        <Outro />
      </section>
    </div>
  );
};

function withListHOC(Component) {
  return ({ ...props }) => {
    return <Component {...props} />;
  };
}

export default withListHOC(List);

export function formatToLocaleDateString(
  dateAsText = '',
  formatStr = 'd.M.yyyy',
  options = { locale: sl }
) {
  const date = new Date(dateAsText);
  return format(date, formatStr, options);
}

// date received is part of an object with properties: year, month, day
export function getDate(obj = {}) {
  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}

// extract last item in array form API data
export function getLastUpdatedData({
  stats,
  municipalities,
  patients,
  labTests,
}) {
  return {
    patientsData: patients.slice(-1).pop(),
    statsData: stats.slice(-1).pop(),
    municipalitiesData: municipalities.slice(-1).pop(),
    labTestsData: labTests.slice(-1).pop(),
  };
}

/**
 * paint red if data is not updated for the current day;
 * variables <somethin>Check are used as className
 */
export function getChecks({
  stats,
  municipalities,
  patients,
  summary,
  labTests,
}) {
  const isUndefined = val => val === undefined;
  // data
  const lastUpdatedData = getLastUpdatedData({
    stats,
    patients,
    municipalities,
    labTests,
  });

  // dates
  const patientsDate = getDate(lastUpdatedData.patientsData);
  const statsDate = getDate(lastUpdatedData.statsData);
  const municipalitiesDate = getDate(lastUpdatedData.municipalitiesData);
  const labTestsDate = getDate(lastUpdatedData.labTestsData);
  const summaryDate = getDate(summary.casesActive); // before labTests

  // checks
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  const isPerAgeDataUndefined = isUndefined(
    stats.slice(-2, -1).pop().statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 1;

  const summaryCheck = differenceInDays(new Date(), summaryDate) > 1;

  return {
    check_summary: summaryCheck ? 'red' : '',
    check_patients: patientsCheck ? 'red' : '',
    check_stats: statsCheck ? 'red' : '',
    check_municipalities: municipalitiesCheck ? 'red' : '',
    check_lab_tests: labTestsCheck ? 'red' : '',
  };
}
