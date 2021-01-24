import React from 'react';

import TESTS_ACTIVE from './TESTS_ACTIVE';
import HOSPITALIZED_DECEASED from './HOSPITALIZED_DECEASED';
import CITIES_SOCIAL_FRIENDLY from './Combined/CITIES_SOCIAL_FRIENDLY';
import PerAge from './Combined/PerAge';
import InHospitals from './Combined/InHospitals';
import Vaccination from './Combined/Vaccination';
import Confirmed from './Combined/Confirmed';
import { formatNumber } from './../../utils/formatNumber';
import { getDate } from '../List';
import { differenceInDays } from 'date-fns';

function Combined({
  labTestsHook,
  summaryHook,
  patientsHook,
  combined,
  ...props
}) {
  return (
    <>
      <TESTS_ACTIVE labTestsHook={labTestsHook} summaryHook={summaryHook} />
      <Vaccination
        check_stats={combined.css.check_stats}
        toDate={formatNumber(combined.vaccinationToDate)}
      />
      <Confirmed
        check_stats={combined.css.check_stats}
        confirmed={formatNumber(combined.confirmedToDate)}
      />
      <PerAge
        title={'Potrjeni primeri po starosti'}
        check_stats={combined.css.check_stats}
        todayPerAge={combined.todayPerAge}
        yesterdayPerAge={combined.yesterdayPerAge}
      />
      <HOSPITALIZED_DECEASED patientsHook={patientsHook} />
      <InHospitals
        title={'Stanje po bolnišnicah'}
        check_patients={combined.css.check_patients}
        patients={combined.patients}
        perHospitalChanges={combined.perHospitalChanges}
      />
      <CITIES_SOCIAL_FRIENDLY
        title={'Po krajih'}
        check_municipalities={combined.css.check_municipalities}
        municipalities={combined.municipalities}
      />
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
    const { isLoading } =
      statsHook.isLoading ||
      patientsHook.isLoading ||
      municipalitiesHook.isLoading ||
      hospitalsListHook.isLoading ||
      summaryHook.isLoading ||
      labTestsHook.isLoading;

    if (isLoading) {
      return <p>Combined is loading....</p>;
    }
    if (statsHook.data === null) {
      return <p>Combined is loading....</p>;
    }
    if (patientsHook.data === null) {
      return <p>Combined is loading....</p>;
    }
    if (municipalitiesHook.data === null) {
      return <p>Combined is loading....</p>;
    }
    if (hospitalsListHook.data === null) {
      return <p>Combined is loading....</p>;
    }
    if (summaryHook.data === null) {
      return <p>Combined is loading....</p>;
    }
    if (labTestsHook.data === null) {
      return <p>Combined is loading....</p>;
    }

    const patients = patientsHook.data;
    const municipalities = municipalitiesHook.data;

    const combined = {
      ...getCombinedData(
        statsHook.data,
        hospitalsListHook.data,
        patientsHook.data,
        municipalitiesHook.data
      ),
      patients,
      municipalities,
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

// API paths: stats
function getCombinedData(stats, hospitalsList, patients, municipalities) {
  const statsYesterday = stats.slice(-2, -1).pop();
  const statsTwoDaysAgo = stats.slice(-3, -2).pop();
  const todayPerAge = statsYesterday.statePerAgeToDate;
  const yesterdayPerAge = statsTwoDaysAgo.statePerAgeToDate;

  const vaccinationToDate = statsYesterday.vaccination.administered.toDate;

  const confirmedToDate = statsYesterday.cases.confirmedToDate;

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

  // CSS
  const statsToday = stats.slice(-1).pop();
  const patientsToday = patients.slice(-1).pop();
  const municipalitiesToday = municipalities.slice(-1).pop();
  const patientsDate = getDate(patientsToday);
  const statsDate = getDate(statsToday);
  const municipalitiesDate = getDate(municipalitiesToday);
  const patientsCheck = differenceInDays(new Date(), patientsDate) > 0;

  const isPerAgeDataUndefined = isUndefined(
    statsYesterday.statePerAgeToDate[0].allToDate
  );
  const statsCheck =
    isPerAgeDataUndefined || differenceInDays(new Date(), statsDate) > 0;

  const municipalitiesCheck =
    differenceInDays(new Date(), municipalitiesDate) > 1;

  return {
    todayPerAge,
    yesterdayPerAge,
    vaccinationToDate,
    confirmedToDate,
    perHospitalChanges: perHospitalChangesWithLongName,
    css: {
      check_patients: patientsCheck ? 'red' : '',
      check_stats: statsCheck ? 'red' : '',
      check_municipalities: municipalitiesCheck ? 'red' : '',
    },
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
