import React from 'react';

import format from 'date-fns/format';
import { sl } from 'date-fns/locale';
import differenceInDays from 'date-fns/differenceInDays';

import Intro from './shared/ui/Intro';
import Outro from './shared/ui/Outro';
import TESTS_ACTIVE from './List/TESTS_ACTIVE';
import Combined from './List/Combined';

import './List.css';
import HOSPITALIZED_DECEASED from './List/HOSPITALIZED_DECEASED';

function getTestsActiveData(labData, active) {
  const { regular, hagt } = labData;
  const casesActive = active.value;
  const casesActiveIn = active.subValues.in;
  const casesActiveOut = active.subValues.out;

  const cases = { casesActive, casesActiveIn, casesActiveOut };

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

function getHospitalizedDeceasedData(
  statsToday = {},
  statsYesterday = {},
  patientsToday = {}
) {
  const hospNum = statsToday.statePerTreatment.inHospital;
  const hospIn = patientsToday.total.inHospital.in;
  const hospOut = patientsToday.total.inHospital.out;
  const icuNum = statsToday.statePerTreatment.inICU;
  const todayICU = statsToday.statePerTreatment.inICU;
  const yesterdayICU = statsYesterday.statePerTreatment.inICU;
  const icuDelta = todayICU - yesterdayICU;
  const hospitalized = {
    hospNum,
    hospIn,
    hospOut: -hospOut,
    icuNum,
    icuDelta,
  };

  const todayCritical = statsToday.statePerTreatment.critical;
  const yesterdayCritical = statsYesterday.statePerTreatment.critical;
  const respiratoryDelta = todayCritical - yesterdayCritical;
  const onRespiratory = { todayCritical, respiratoryDelta };

  const { deceased: dead, deceasedToDate } = statsToday.statePerTreatment;
  const deceased = { deceased: dead, deceasedToDate };

  return {
    hospitalized,
    onRespiratory,
    deceased,
  };
}

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
  const lastLabTests = labTests.slice(-1).pop().data;
  const { casesActive } = summary;
  const { cases, regTests, hagtTests } = getTestsActiveData(
    lastLabTests,
    casesActive
  );

  // prepare data for HOSPITALIZED_DECEASED
  const statsToday = stats.slice(-1).pop();
  const statsYesterday = stats.slice(-2, -1).pop();
  const patientsToday = patients.slice(-1).pop();
  const { hospitalized, onRespiratory, deceased } = getHospitalizedDeceasedData(
    statsToday,
    statsYesterday,
    patientsToday
  );

  // prepare data fot Combined

  // prepare hospitalsDict
  const hospitalsDict = prepareHospitalsDict(hospitalsList);

  // prepare perHospitalChanges
  const perHospitalChanges = getPerHospitalChanges(patients);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );
  const statsTwoDaysAgo = stats.slice(-3, -2).pop();
  const combined = getCombinedData(statsYesterday, statsTwoDaysAgo);
  combined.perHospitalChanges = perHospitalChangesWithLongName;
  combined.patients = patients;
  combined.municipalities = municipalities;

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
function getPerHospitalChanges(patients) {
  const patientsData = patients.slice(-1).pop();
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
 * date received is part of an object with properties: year, month, day
 */
function getDate(obj = {}) {
  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}

/**
 * paint red if data is not updated for the current day;
 * variables <somethin>Check are used as className
 */
function getChecks({ stats, municipalities, patients, summary, labTests }) {
  // data
  const patientsData = patients.slice(-1).pop();
  const statsData = stats.slice(-1).pop();
  const municipalitiesData = municipalities.slice(-1).pop();
  const labTestsData = labTests.slice(-1).pop();

  // dates
  const patientsDate = getDate(patientsData);
  const statsDate = getDate(statsData);
  const municipalitiesDate = getDate(municipalitiesData);
  const labTestsDate = getDate(labTestsData);
  const summaryDate = getDate(summary.testsToday);

  // checks
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  const isPerAgeDataUndefined = isUndefined(
    stats.slice(-2, -1).pop().statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  const labTestsCheck = differenceInDays(new Date(), labTestsDate) > 0;

  const summaryCheck = differenceInDays(new Date(), summaryDate) > 0;

  return {
    check_summary: summaryCheck ? 'red' : '',
    check_patients: patientsCheck ? 'red' : '',
    check_stats: statsCheck ? 'red' : '',
    check_municipalities: municipalitiesCheck ? 'red' : '',
    check_lab_tests: labTestsCheck ? 'red' : '',
  };
}
