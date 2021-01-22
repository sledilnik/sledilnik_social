import React from 'react';

import format from 'date-fns/format';
import { sl } from 'date-fns/locale';
import differenceInDays from 'date-fns/differenceInDays';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';
import Combined from './List/Combined';

import './List.css';

// API paths: lab-tests, summary
// ? ditch api call api/summary and use stats?
/**
 * Aktivni: current(+ new, -old)
 * current = cases.active(t)
 * new = cases.confirmedToday(t)
 * old = cases.active(t-1) - cases.active(t) + cases.confirmedToday(t)
 */
function getTestsActiveData(labData, active) {
  const { regular, hagt } = labData;
  const casesActive = active.value;
  const casesActiveIn = active.subValues.in;
  const casesActiveOut = active.subValues.out;

  const cases = { casesActive, casesActiveIn, casesActiveOut: -casesActiveOut };

  const { today: regToday } = regular.positive;
  const { today: regPerformed } = regular.performed;
  const { today: hagtToday } = hagt.positive;
  const { today: hagtPerformed } = hagt.performed;

  const calcFraction = (numerator, denominator) => numerator / denominator;

  const regFraction = calcFraction(regToday, regPerformed);
  const hagtFraction = calcFraction(hagtToday, hagtPerformed);

  const regTests = { regToday, regPerformed, regFraction };
  const hagtTests = { hagtToday, hagtPerformed, hagtFraction };

  return {
    cases,
    regTests,
    hagtTests,
  };
}
// API paths: stats, patients
function getHospitalizedDeceasedData(
  patientsToday = {},
  patientsYesterday = {}
) {
  const {
    today: hospNum,
    in: hospIn,
    out: hospOut,
  } = patientsToday.total.inHospital;
  const todayICU = patientsToday.total.icu.today;
  const yesterdayICU = patientsYesterday.total.icu.today;
  const icuDelta = todayICU - yesterdayICU;
  const hospitalized = {
    hospNum,
    hospIn,
    hospOut: -hospOut,
    icuNum: todayICU,
    icuDelta,
  };

  const todayCritical = patientsToday.total.critical.today;
  const yesterdayCritical = patientsYesterday.total.critical.today;
  const respiratoryDelta = todayCritical - yesterdayCritical;
  const onRespiratory = { todayCritical, respiratoryDelta };

  const { today: careNum, in: careIn, out: careOut } = patientsToday.total.care;
  const inCare = { careNum, careIn, careOut: -careOut };

  // TODO rename deceased properties -> use today and toDate
  const { today: dead, toDate: deceasedToDate } = patientsToday.total.deceased;
  const deceased = { deceased: dead, deceasedToDate };

  return {
    hospitalized,
    onRespiratory,
    inCare,
    deceased,
  };
}

// API paths: stats
function getCombinedData(statsYesterday, statsTwoDaysAgo) {
  const todayPerAge = statsYesterday.statePerAgeToDate;
  const yesterdayPerAge = statsTwoDaysAgo.statePerAgeToDate;

  const vaccinationToDate = statsYesterday.vaccination.administered.toDate;
  const vaccinationToday = statsYesterday.vaccination.administered.today;

  const confirmedToDate = statsYesterday.cases.confirmedToDate;

  return {
    todayPerAge,
    yesterdayPerAge,
    vaccinationToDate,
    vaccinationToday,
    confirmedToDate,
  };
}

const List = ({
  stats,
  municipalities,
  patients,
  labTests,
  summary,
  hospitalsList,
}) => {
  if (!stats || stats.length === 0)
    return <p>Napaka: API ne vrača podatkov, refresh page !!!</p>;

  const css = getChecks({ stats, municipalities, patients, summary, labTests });

  const introTodayDate = formatToLocaleDateString(new Date(), 'd.M.yyyy');

  //prepare data for TESTS_ACTIVE
  // use data fromAPI paths: summary, lab-tests
  const lastLabTests = labTests.slice(-1).pop().data;
  const { casesActive } = summary;
  const { cases, regTests, hagtTests } = getTestsActiveData(
    lastLabTests,
    casesActive
  );

  // prepare data for HOSPITALIZED_DECEASED
  // use data fromAPI paths: stats, patients
  // TODO remove stats
  const statsYesterday = stats.slice(-2, -1).pop();
  const patientsToday = patients.slice(-1).pop();
  const patientsYesterday = patients.slice(-2, -1).pop();
  const {
    hospitalized,
    onRespiratory,
    inCare,
    deceased,
  } = getHospitalizedDeceasedData(patientsToday, patientsYesterday);

  // prepare data fot Combined
  // {code: 'xxx', name: 'yyy', uri: 'zzz} -> [['xxx', 'zzz]] [[<code>,<name>]]
  const hospitalsDict = prepareHospitalsDict(hospitalsList);

  // prepare perHospitalChanges
  // use data fromAPI paths: stats, patients, municipalities
  const perHospitalChanges = getPerHospitalChanges(patients);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );
  const statsTwoDaysAgo = stats.slice(-3, -2).pop();
  // todo rename getCOmbined  partial?
  const combined = {
    ...getCombinedData(statsYesterday, statsTwoDaysAgo),
    perHospitalChanges: perHospitalChangesWithLongName,
    patients,
    municipalities,
  };

  return (
    <div className="List">
      <section className="tweet">
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE
          check_summary={css.check_summary}
          check_lab_tests={css.check_lab_tests}
          cases={cases}
          regTests={regTests}
          hagtTests={hagtTests}
        />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED
          check_patients={css.check_patients}
          hospitalized={hospitalized}
          onRespiratory={onRespiratory}
          deceased={deceased}
          stats={stats}
          patients={patients}
        />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={3} introTodayDate={introTodayDate} />
        <Combined
          testsActive={{ cases, regTests, hagtTests }}
          hospitalizedDeceased={{ hospitalized, onRespiratory, deceased }}
          combined={combined}
          css={css}
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
// -> [["ukclj", {care: {...}, critical: {..}, deceased: {...},deceasedCare: {...}, icu: {...}, inHospital: {...}, niv: {...} }],...]
// properties of interest icu & inHospital
function getPerHospitalChanges(patients) {
  const patientsData = patients.slice(-1).pop();
  const patientsDataIsNotUndefined = !isUndefined(patientsData);
  return patientsDataIsNotUndefined && Object.entries(patientsData.facilities);
}

// -> [["ukclj", {...}, "UKC Ljubljana"],... ]
function findAndPushLongHospitalName(perHospitalChanges, hospitalsDict) {
  return perHospitalChanges.map(hospital => {
    const hospitalLongName = hospitalsDict.filter(
      item => hospital[0] === item[0]
    )[0][1];
    return [...hospital, hospitalLongName];
  });
}

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
