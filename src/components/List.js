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

  // prepare hospitalsDict
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

  return (
    <div className="List">
      <section className="tweet">
        <Intro post={1} introTodayDate={introTodayDate} />
        <TESTS_ACTIVE
          check_first={check_first}
          cases={cases}
          regTests={regTests}
          hagtTests={hagtTests}
        />
        <Outro />
      </section>
      <section className="tweet">
        <Intro post={2} introTodayDate={introTodayDate} />
        <HOSPITALIZED_DECEASED
          check_second={check_second}
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
function createDateFromObject(obj = {}) {
  let { year, month, day } = obj;
  return new Date(year, month - 1, day);
}

/**
 * paint red if data is not updated for the current day;
 * params <somethin>Check are used as className
 * TODO figure out if you can use date-fns
 */
function getChecks({ stats, municipalities, patients, summary }) {
  // data
  const patientsData = patients.slice(-1).pop();
  const statsData = stats.slice(-1).pop();
  const municipalitiesData = municipalities.slice(-1).pop();

  // dates
  const patientsDate = createDateFromObject(patientsData);
  const statsDate = createDateFromObject(statsData);
  const municipalitiesDate = createDateFromObject(municipalitiesData);
  const summaryDate = createDateFromObject(summary.testsToday);

  // checks
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  const isPerAgeDataUndefined = isUndefined(
    stats.slice(-2, -1).pop().statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  const summaryCheck = differenceInDays(new Date(), summaryDate) === -1;

  return {
    check_first: summaryCheck ? 'red' : '',
    check_second: patientsCheck ? 'red' : '',
    check_third_age: statsCheck ? 'red' : '',
    check_third_mun: municipalitiesCheck ? 'red' : '',
  };
}
