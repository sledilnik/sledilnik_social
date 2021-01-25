import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';

import TESTS_ACTIVE from './TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './HOSPITALIZED_DECEASED';
import CITIES_SOCIAL_FRIENDLY from './Combined/CITIES_SOCIAL_FRIENDLY';
import PerAge from './Combined/PerAge';
import InHospitals from './Combined/InHospitals';
import Vaccination from './Combined/Vaccination';
import Confirmed from './Combined/Confirmed';
import { Row } from '../shared/ui/New';

import { formatNumber } from './../../utils/formatNumber';
import { getDate } from '../../utils/dates';

function Combined({ labTestsHook, summaryHook, patientsHook, combined }) {
  const vac1 = combined.vaccinationToDate
    ? formatNumber(combined.vaccinationToDate)
    : '-';
  const vac2 = combined.vaccination2ToDate
    ? formatNumber(combined.vaccination2ToDate)
    : '-';

  const vaccinationShow = vac1 && vac2;

  const confirmedShow = combined.confirmedToDate;
  const perAgeShow = combined.todayPerAge && combined.yesterdayPerAge;
  const inHospitalsShow = combined.patients && combined.perHospitalChanges;
  const citiesShow = combined.municipalities;
  return (
    <>
      <TESTS_ACTIVE labTestsHook={labTestsHook} summaryHook={summaryHook} />
      {vaccinationShow ? (
        <Vaccination
          check_stats={combined.css.check_stats}
          toDate={vac1}
          toDate2={vac2}
        />
      ) : (
        <Row>VACCINATION: LOADING...</Row>
      )}
      {confirmedShow ? (
        <Confirmed
          check_stats={combined.css.check_stats}
          confirmed={formatNumber(combined.confirmedToDate)}
        />
      ) : (
        <Row>CONFIRMED: LOADING...</Row>
      )}
      {perAgeShow ? (
        <PerAge
          title={'Potrjeni primeri po starosti'}
          check_stats={combined.css.check_stats}
          todayPerAge={combined.todayPerAge}
          yesterdayPerAge={combined.yesterdayPerAge}
        />
      ) : (
        <Row>PerAge: LOADING...</Row>
      )}
      <HOSPITALIZED_DECEASED patientsHook={patientsHook} />
      {inHospitalsShow ? (
        <InHospitals
          title={'Stanje po bolnišnicah'}
          check_patients={combined.css.check_patients}
          patients={combined.patients}
          perHospitalChanges={combined.perHospitalChanges}
        />
      ) : (
        <Row>InHospitals: LOADING...</Row>
      )}
      {citiesShow ? (
        <CITIES_SOCIAL_FRIENDLY
          title={'Po krajih'}
          check_municipalities={combined.css.check_municipalities}
          municipalities={combined.municipalities}
        />
      ) : (
        <Row>CITIES: LOADING...</Row>
      )}
    </>
  );
}

function withCombinedHOC(Component) {
  return ({
    statsHook,
    summaryHook,
    patientsHook,
    labTestsHook,
    municipalitiesHook,
    hospitalsListHook,
    ...props
  }) => {
    const {
      todayPerAge,
      yesterdayPerAge,
      vaccinationToDate,
      vaccination2ToDate,
      confirmedToDate,
      css: statsCss,
    } = statsHook.data !== null && getStatsData(statsHook.data);

    const { perHospitalChanges, css: patientsCss } =
      hospitalsListHook.data !== null &&
      patientsHook.data !== null &&
      getInHospitalsData(hospitalsListHook.data, patientsHook.data);

    const { css: municipalitiesCss } =
      municipalitiesHook.data !== null &&
      getMunicipalitiesCss(municipalitiesHook.data);

    const combined = {
      todayPerAge,
      yesterdayPerAge,
      vaccinationToDate,
      vaccination2ToDate,
      confirmedToDate,
      perHospitalChanges,
      css: {
        ...statsCss,
        ...patientsCss,
        ...municipalitiesCss,
      },

      patients: patientsHook.data,
      municipalities: municipalitiesHook.data,
    };

    const data = {
      combined,
      labTestsHook,
      summaryHook,
      patientsHook,
      ...props,
    };

    return <Component {...data} />;
  };
}

export default withCombinedHOC(Combined);

const getStatsData = stats => {
  if (stats === null) {
    return {
      todayPerAge: null,
      yesterdayPerAge: null,
      vaccinationToDate: null,
      vaccination2ToDate: null,
      confirmedToDate: null,
      css: null,
    };
  }
  const statsYesterday = stats.slice(-2, -1).pop();
  const statsTwoDaysAgo = stats.slice(-3, -2).pop();
  const todayPerAge = statsYesterday.statePerAgeToDate;
  const yesterdayPerAge = statsTwoDaysAgo.statePerAgeToDate;

  //
  const vaccinationToDate = statsYesterday.vaccination.administered.toDate;
  const vaccination2ToDate = statsYesterday.vaccination.administered2nd.toDate;

  const confirmedToDate = statsYesterday.cases.confirmedToDate;

  // CSS
  const statsToday = stats.slice(-1).pop();
  const statsDate = getDate(statsToday);
  const isPerAgeDataUndefined = isUndefined(
    statsYesterday.statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  return {
    todayPerAge,
    yesterdayPerAge,
    vaccinationToDate,
    vaccination2ToDate,
    confirmedToDate,
    css: { check_stats: statsCheck ? 'red' : '' },
  };
};

const getInHospitalsData = (hospitalsList, patients) => {
  if (hospitalsList === null || patients === null) {
    return {
      perHospitalChanges: null,
      css: {
        check_patients: null,
      },
    };
  }

  // {code: 'xxx', name: 'yyy', uri: 'zzz} -> [['xxx', 'zzz]] [[<code>,<name>]]
  const hospitalsDict = prepareHospitalsDict(hospitalsList);

  // prepare perHospitalChanges
  const perHospitalChanges = getPerHospitalChanges(patients);
  const perHospitalChangesWithLongName = findAndPushLongHospitalName(
    perHospitalChanges,
    hospitalsDict
  );

  // CSS
  const patientsToday = patients.slice(-1).pop();
  const patientsDate = getDate(patientsToday);
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  return {
    perHospitalChanges: perHospitalChangesWithLongName,
    css: {
      check_patients: patientsCheck ? 'red' : '',
    },
  };
};

function getMunicipalitiesCss(municipalities) {
  if (municipalities === null) {
    return { css: { check_municipalities: null } };
  }
  const municipalitiesToday = municipalities.slice(-1).pop();
  const municipalitiesDate = getDate(municipalitiesToday);

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  return {
    css: { check_municipalities: municipalitiesCheck ? 'red' : '' },
  };
}

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
